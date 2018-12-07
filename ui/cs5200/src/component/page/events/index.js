import React from 'react';
import { Layout, Card, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { WithLoader } from '../../util/api/loader';
import { getCareerEvent, updateEvent } from '../../../api/career-events';
import { WithUser, getUserType } from '../../util/datastore/user';
import AttendeesList from './attendees-list';
import RegisterButton from './register-button';
import moment from 'moment';
import SchoolSelector from '../../util/form/school';

const toTimeString = (start, end) => {
    return moment(start).format('LLLL') + ' - ' + moment(end).format('LLLL');
};

class EditableEventsPageInner extends React.Component {
    _handleSubmit = (e) => {
        this.props.form.validateFields((err, values) => {
            if (err) return;
            updateEvent(this.props.event.id, values).then(() => this.props.reload());
        });
    };
    render() {
        const event = this.props.event;
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout>
                <Layout.Content style={{padding: '24px 10px', margin: '0 100px', backgroundColor: '#fff', maxWidth: '100%', overflowY: 'scroll'}}>
                    <Card loading={this.props.loadStatus === 'loading'}>
                        <Card.Meta
                            title={<h2>Name: {getFieldDecorator('name', {
                                initialValue: event.name,
                                rules: [{required: true, message: 'Please enter a name'}]
                            })(<Input/>)}</h2>}
                            description={
                                <div>
                                    School: {getFieldDecorator('school', {
                                        initialValue: event.school.id,
                                        rules: [{required: true, message: 'Please select a school'}]
                                    })(<SchoolSelector/>)}<br/>
                                    Location: {getFieldDecorator('location', {
                                        initialValue: event.location,
                                        rules: [{required: true, message: 'Please enter a location'}]
                                    })(<Input/>)}<br/>
                                    Date/Time: {toTimeString(event.start, event.end)}
                                </div>
                            }/>
                        <br/>
                        <h2>Company</h2>
                        <Link to={"/companies/" + event.company.id + "/"}>{event.company.name}</Link>
                        <h2>Description</h2>
                        <div style={{}}>{getFieldDecorator('description', {
                                        initialValue: event.description
                                    })(<Input.TextArea/>)}</div>
                        <Button onClick={this._handleSubmit}>Save Changes</Button>
                        <AttendeesList event={event}/>
                    </Card>
                    
                </Layout.Content>
            </Layout>
        );
    }
}

const EditableEventsPage = Form.create()(EditableEventsPageInner);

class EventPageView extends React.Component {
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

const EventPage = WithUser(props => {
    if (getUserType(props.user) === 'company' && props.user.id === props.event.company.id) {
        return <EditableEventsPage {...props}/>;
    } else {
        return <EventPageView {...props}/>;
    }
});

export default WithLoader(getCareerEvent, {
    loadArg: (props) => props.match.params.id,
    mapLoadToProps: (event) => ({event})
})(EventPage);