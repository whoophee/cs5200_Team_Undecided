import React from 'react';

const makeDatastoreWithSet = (componentRegister, initData) => class extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = initData[0];
    }

    render() {
        const {component: Child, mapToProps} = this.props.datastore;
        return <Child {...this.props} {...mapToProps(this.state)}/>
    }

    componentDidMount() {
        componentRegister.add(this);
    }

    componentWillUnmount() {
        componentRegister.delete(this);
    }
};

export function makeDatastore(initData) {
    const set = new Set();
    let data = [initData];
    const Component = makeDatastoreWithSet(set, data);
    return {
        Component,
        update: (fun) => {
            data[0] = fun(data[0]);
            set.forEach(item => {
                item.setState(data[0]); 
            });
        },
        WithDatastore: (Child, mapToProps = props => props) => (props) => {
            const datastore = {
                component: Child,
                mapToProps
            };
            return <Component datastore={datastore} {...props}/>;
        }
    };
}