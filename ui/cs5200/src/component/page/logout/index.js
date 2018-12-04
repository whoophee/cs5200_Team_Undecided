import React from 'react';
import { Redirect } from 'react-router-dom';
import { update, WithUser } from '../../util/datastore/user';
import { logout } from '../../../api/user';

class LogoutRedirect extends React.Component {
    render() {
        if (this.props.user === null) {
            return (
                <Redirect to="/"/>
            );
        }
        return "Logging out...";
    }
    componentDidMount() {
        logout().then(() => {
            update(() => ({user: null}));
        });
    }
}

export default WithUser(LogoutRedirect);