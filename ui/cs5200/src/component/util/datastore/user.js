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

getLoggedInUserData().then(body => update(() => ({user: body})));

export default Component;