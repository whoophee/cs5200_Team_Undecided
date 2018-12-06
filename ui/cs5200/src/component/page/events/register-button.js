import React from 'react';
import { NeedsUser } from '../../util/datastore/user';
import { Button } from 'antd';
import { WithLoader } from '../../util/api/loader';
import { getRegistrationForMe, createRegistrationForMe } from '../../../api/registration';

class AttendeesList extends React.Component {
    _handleRegister = (e) => {
        createRegistrationForMe(this.props.event.id).then(() => this.props.reload());
    };
    render() {
        const registration = this.props.registration;
        return (
            !registration ?
            <div>
                <br/>
                <h2>Register Now!</h2>
                <Button type="primary" onClick={this._handleRegister}>Register</Button>
            </div> :
            <div>
                <h2>You are already registered for this event!</h2>
            </div>
        );
    }
}

export default NeedsUser(['student'])(WithLoader(getRegistrationForMe, {
    loadArg: (props) => props.event.id,
    mapLoadToProps: (registration) => ({registration})
})(AttendeesList));