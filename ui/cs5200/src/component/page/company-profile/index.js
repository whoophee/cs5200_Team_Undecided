import React from 'react';
import { Layout, Card, List } from 'antd';
import { WithLoader } from '../../util/api/loader';
import { getCompanyWithCareerEvents } from '../../../api/company';
import { Link } from 'react-router-dom';
import { WithUser, getUserType } from '../../util/datastore/user';


class CompanyProfile extends React.Component {
    _renderCareerEventList() {
        let filter = getUserType(this.props.user) === 'student'
                ? (item) => item.school.id === this.props.user.school.id
                : getUserType(this.props.user) === 'school'
                ? (item) => item.school.id === this.props.user.id
                : () => true;
        return (
            
            <List bordered>
                {this.props.company.careerEvents.filter(filter).map(event => (
                    <List.Item key={event.id}>
                        <Link to={'/events/' + event.id + '/'}>{event.school.name}
                        {' - '}
                        {event.name}</Link>
                    </List.Item>
                ))}
            </List>
        );
    }
    render() {
        const company = this.props.company;

        return (
            <Layout>
                <Layout.Content style={{padding: '24px 10px', margin: '0 100px', backgroundColor: '#fff', maxWidth: '100%', overflowY: 'scroll'}}>
                    <Card>
                        <Card.Meta
                            title={<h1>{company.name}</h1>}
                            description={
                                <div>
                                    Headquarters: {company.headquartersText}<br/>
                                    Size: {company.size}<br/>
                                    Industry: {company.industry}
                                </div>
                            }/>
                        <br/>
                        <h2>About</h2>
                        <div style={{}}>{company.description}</div><br/>
                        <h2>Career Events</h2>
                        {this._renderCareerEventList()}
                    </Card>
                    
                </Layout.Content>
            </Layout>
        );
    }
}

export default WithLoader(getCompanyWithCareerEvents, {
    loadArg: props => props.match.params.id,
    mapLoadToProps: (company) => ({company})
})(WithUser(CompanyProfile));