import React from 'react';
import {makeDatastore} from './datastore';
import {getLoggedInUserData} from '../../../api/user';

const {Component: ChildComponent, update: updatee} = makeDatastore({user: null});

class Component extends React.Component {
    _mapToProps = props => props;

    render() {
        const Child = this.props.component;

        return <ChildComponent datastore={{
            component: Child,
            mapToProps: this._mapToProps
        }} {...this.props}/>
    }
}

export const update = updatee;

export const reloadData = () => getLoggedInUserData().then(body => update(() => ({user: body})));

export const WithUser = (child) => {
    const datastore = {
        component: child,
        mapToProps: props => props
    };
    return (props) => <ChildComponent datastore={datastore} {...props}/>
};

export const getUserType = user => {
    if (user == null) return null;
    if (user.hasOwnProperty('enrollments')) return 'student';
    if (user.hasOwnProperty('classes')) return 'school';
    if (user.hasOwnProperty('sections')) return 'professor';
    if (user.hasOwnProperty('careerEvents')) return 'company';
    return 'admin';
};

export const NeedsUser = (userTypes, elseRender = (props) => null) => (Child) => WithUser((props) => {
    if (userTypes.indexOf(getUserType(props.user)) < 0) return elseRender(props);
    return <Child {...props}/>;
});

reloadData();

export default Component;