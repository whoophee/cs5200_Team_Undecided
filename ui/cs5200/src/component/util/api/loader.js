import React from 'react';
import { Spin } from 'antd';

class Component extends React.Component {
    constructor() {
        super();
        this.state = {
            data: null
        };
    }
    componentDidMount() {
        this.props.load()
            .then((data) => {
                this.setState({
                    data
                })
            })
            .catch((err) => {
                this.setState({
                    err
                })
            });
    }

    render() {
        const Child = this.props.component;

        if (this.state.data != null) {
            return <Child {...this.props.mapLoadToProps(this.state.data)} {...this.props}/>;
        }
        return <Spin/>
    }
}

export default Component;