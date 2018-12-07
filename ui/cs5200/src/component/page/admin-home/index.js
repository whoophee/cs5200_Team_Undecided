import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Route, Redirect } from "react-router-dom";
import CompanyList from './company-list';
import ProfessorList from './professor-list';
import SchoolList from './school-list';
import StudentList from './student-list';
import EventProfile from '../events/index';
import { SchoolProfile, StudentProfile, CompanyProfile, ProfessorProfile } from './profile-edit';
import { NeedsUser } from '../../util/datastore/user';

class AdminPage extends React.Component {
    static getDerivedStateFromProps(props, state) {
        const path = props.location.pathname;
        return {
            selectedKey: ['professors', 'schools', 'companies', 'students'].find(item => path.indexOf(item) >= 0)
        };
    }
    _renderSider() {
        const path = this.props.match.path;
        return (
            <Menu
                mode="inline"
                selectedKeys={[this.state.selectedKey]}
                style={{height: '100%'}}>
                <Menu.Item key="students">
                    <Link to={path + "students/"}>Students</Link>
                </Menu.Item>
                <Menu.Item key="professors">
                    <Link to={path + "professors/"}>Professors</Link>
                </Menu.Item>
                <Menu.Item key="companies">
                    <Link to={path + "companies/"}>Companies</Link>
                </Menu.Item>
                <Menu.Item key="schools">
                    <Link to={path + "schools/"}>Schools</Link>
                </Menu.Item>
            </Menu>
        )
    }
    _redirectToClasses = () => {
        return <Redirect to={this.props.match.path + 'students/'}/>;
    };
    _renderContent() {
        const path = this.props.match.path;
        return (
            <div style={{padding: '10px'}}>
                <Route path={path} exact render={this._redirectToClasses}/>
                <Route path={path + 'professors/'} exact component={ProfessorList}/>
                <Route path={path + 'students/'} exact component={StudentList}/>
                <Route path={path + 'companies/'} exact component={CompanyList}/>
                <Route path={path + 'schools/'} exact component={SchoolList}/>

                <Route path={path + 'professors/:id/'} exact component={ProfessorProfile}/>
                <Route path={path + 'students/:id/'} exact component={StudentProfile}/>
                <Route path={path + 'companies/:id/'} exact component={CompanyProfile}/>
                <Route path={path + 'companies/:companyId/events/:id/'} exact render={this._renderProfile}/>
                <Route path={path + 'schools/:id/'} exact component={SchoolProfile}/>
            </div>
        );
    }
    _renderProfile = (props) => {
        return <EventProfile {...props} style={{}}/>;
    };
    render() {
        return (
            <Layout style={{padding: '24px 0px', margin: '0 100px', backgroundColor: '#fff'}}>
                <Layout.Sider width={300} height="100%" style={{backgroundColor: '#fff'}}>
                    {this._renderSider()}
                </Layout.Sider>
                <Layout.Content>
                    {this._renderContent()}
                </Layout.Content>
            </Layout>
        );
    }
}

export default NeedsUser(['admin'])(AdminPage);