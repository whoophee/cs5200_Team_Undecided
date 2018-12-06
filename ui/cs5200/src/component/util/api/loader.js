import React from 'react';
import { Spin } from 'antd';

// this might die if you pass it a graph :(
function deepEquals(obj1, obj2) {
    if (obj1 === obj2) return true;
    if (obj1 == null) return obj2 == null;
    if (obj2 == null) return obj1 == null;
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        let allSame = true;
        obj1.forEach((item, index) => {
            if (!allSame) return;
            if (!deepEquals(item, obj2[index])) allSame = false;
        });
        return allSame && obj1.length === obj2.length;
    } else if (typeof obj1 === 'object' && typeof obj2 === 'object') {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) return false;
        let allSame = true;
        keys1.forEach(key => {
            if (!allSame) return;
            if (!deepEquals(obj1[key], obj2[key])) {
                allSame = false;
            }
        });
        return allSame;
    } else {
        return obj1 === obj2;
    }
}

class Component extends React.Component {
    constructor() {
        super();
        this.state = {
            data: null,
            status: "unloaded",
            initLoad: false
        };
    }
    componentDidMount() {
        this._load();
        if (this.props.reloadRef) this.props.reloadRef(this._reload);
    }

    _load(arg) {
        this.setState({
            status: "loading"
        });
        return this.props.load(arg || this.props.loadArg)
            .then((data) => {
                this.setState({
                    data,
                    status: "loaded",
                    initLoad: true
                })
            })
            .catch((err) => {
                this.setState({
                    err,
                    status: "error"
                })
            });
    }

    componentDidUpdate(prevProps) {
        if (!deepEquals(prevProps.loadArg, this.props.loadArg)) {
            this._reload();
        }
    }

    _reload = (arg) => {
        return this._load(arg);
    }

    render() {
        const Child = this.props.component;

        if (this.state.initLoad) {
            return <Child {...this.props.mapLoadToProps(this.state.data)} loadStatus={this.state.status} reload={this._reload} {...this.props}/>;
        }
        return <Spin/>
    }
}

export const WithLoader = (load, {loadArg = () => undefined, mapLoadToProps = null}) => (Child) => (props) => <Component mapLoadToProps={mapLoadToProps} load={load} loadArg={loadArg(props)} component={Child} {...props}/>;

export default Component;