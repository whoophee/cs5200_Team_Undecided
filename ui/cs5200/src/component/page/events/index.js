import React from 'react';
import { Layout, Card } from 'antd';
import { Link } from 'react-router-dom';
import { WithLoader } from '../../util/api/loader';
import { getCareerEvent } from '../../../api/career-events';
import AttendeesList from './attendees-list';
import RegisterButton from './register-button';
import moment from 'moment';

const toTimeString = (start, end) => {
    console.log(start, end);
    return moment.utc(start).format('LLLL') + ' - ' + moment.utc(end).format('LLLL');
};

class EventPage extends React.Component {
    render() {
        const event = this.props.event;
        return (
            <Layout>
                <Layout.Content style={{padding: '24px 10px', margin: '0 100px', backgroundColor: '#fff', maxWidth: '100%', overflowY: 'scroll'}}>
                    <Card>
                        <Card.Meta
                            title={<h1>{event.name}</h1>}
                            description={
                                <div>
                                    School: {event.school.name}<br/>
                                    Location: {event.location}<br/>
                                    Date/Time: {toTimeString(event.start, event.end)}
                                </div>
                            }/>
                        <br/>
                        <h2>Company</h2>
                        <Link to={"/companies/" + event.company.id + "/"}>{event.company.name}</Link>
                        <h2>Description</h2>
                        <div style={{}}>{event.description}</div>
                        <AttendeesList event={event}/>
                        <RegisterButton event={event}/>
                    </Card>
                    
                </Layout.Content>
            </Layout>
        );
    }
}

export default WithLoader(getCareerEvent, {
    loadArg: (props) => props.match.params.id,
    mapLoadToProps: (event) => ({event})
})(EventPage);