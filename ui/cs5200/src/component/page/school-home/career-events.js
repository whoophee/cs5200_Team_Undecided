import React from 'react';
import { WithLoader } from '../../util/api/loader';
import { getCareerEventsForMe, approveCareerEvent } from '../../../api/career-events';
import { List, Row, Button } from 'antd';
import { Link } from 'react-router-dom';

const CareerList = WithLoader(getCareerEventsForMe, {
    mapLoadToProps: (events) => ({events})
})(props => {
    const events = props.events;
    return (
        <List bordered>
            {events.map(event => (
                <List.Item key={event.id}
                    actions={[!event.approved ?
                        <Button onClick={() => approveCareerEvent(event.id).then(() => props.reload())}>Approve</Button>
                        :
                    <span>Status: Approved</span>]}>
                    <Link to={'/events/' + event.id + '/'}>
                        {event.company.name}
                        {' - '}
                        {event.name}
                        {' - '}
                        {event.location}
                    </Link>
                </List.Item>
            ))}
        </List>
    );
});

export class EventPage extends React.Component {
    render() {
        return (
            <div>
                <Row type="flex" justify="space-between">
                    <h1>Career Events</h1>
                </Row>
                <Row>
                    <CareerList/>
                </Row>
            </div>
        );
    }
}

export default EventPage;