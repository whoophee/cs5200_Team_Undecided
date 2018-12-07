import React from 'react';
import { NeedsUser } from '../../util/datastore/user';
import { List } from 'antd';

class AttendeesList extends React.Component {
    render() {
        const event = this.props.event;
        return (
            <div>
                <br/>
                <h2>Attendees:</h2>
                <List bordered>
                    {event.attendees.map(student => (
                        <List.Item key={student.id}>
                            {[student.name]}
                        </List.Item>
                    ))}
                    {event.attendees.length === 0 && "Nobody has registered yet :("}
                </List>
            </div>
        )
    }
}

export default NeedsUser(['company', 'admin'])(AttendeesList);