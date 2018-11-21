import React from 'react';

const makeDatastoreWithSet = (componentRegister, initData) => class extends React.Component {

    constructor(props) {
        super(props);
        this.state = initData;
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
    let data = initData;
    return {
        Component: makeDatastoreWithSet(set, data),
        update: (fun) => {
            data = fun(data);
            set.forEach(item => item.setState(data));
        }
    };
}