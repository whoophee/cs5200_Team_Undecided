import React from 'react';
import { Spin } from 'antd';

class Component extends React.Component {
    constructor() {
        super();
        this.state = {
            data: null,
            status: "unloaded"
        };
    }
    componentDidMount() {
        this._load();
        if (this.props.reloadRef) this.props.reloadRef(this._reload);
    }

    _load() {
        this.setState({
            status: "loading"
        });
        return this.props.load()
            .then((data) => {
                this.setState({
                    data,
                    status: "loaded"
                })
            })
            .catch((err) => {
                this.setState({
                    err,
                    status: "error"
                })
            });
    }

    _reload = () => {
        return this._load();
    }

    render() {
        const Child = this.props.component;

        if (this.state.data != null) {
            return <Child {...this.props.mapLoadToProps(this.state.data)} loadStatus={this.state.status} reload={this._reload} {...this.props}/>;
        }
        return <Spin/>
    }
}

export default Component;