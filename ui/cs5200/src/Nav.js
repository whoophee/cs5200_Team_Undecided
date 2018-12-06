import { NeedsUser } from './component/util/datastore/user';
import { Menu, Input } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';

const StudentHome = NeedsUser(['student'])(props => <Menu.Item {...props}><Link to="/student/">Home</Link></Menu.Item>);
const SchoolHome = NeedsUser(['school'])(props => <Menu.Item {...props}><Link to="/school/">Home</Link></Menu.Item>);
const ProfessorHome = NeedsUser(['professor'])(props => <Menu.Item {...props}><Link to="/professor/">Home</Link></Menu.Item>);
const CompanyHome = NeedsUser(['company'])(props => <Menu.Item {...props}><Link to="/company/">Home</Link></Menu.Item>);
const Conversations = NeedsUser(['student', 'professor', 'company', 'school'])(props => <Menu.Item {...props}><Link to="/conversations/">Messages</Link></Menu.Item>);

const Login = NeedsUser([null])(props => <Menu.Item {...props}><Link to="/login/">Login</Link></Menu.Item>);
const Register = NeedsUser([null])(props => <Menu.Item {...props}><Link to="/register/">Register</Link></Menu.Item>);
const Logout = NeedsUser(['student', 'professor', 'company', 'school'])(props => <Menu.Item {...props}><Link to="/logout/">Log Out</Link></Menu.Item>);

const CompanySearch = (props) => <Menu.Item {...props}><Input.Search onSearch={(val) => {
    props.history.push("/companies/?q=" + encodeURI(val || ''));
}} placeholder="Search for Companies" style={{width: '300px'}}></Input.Search></Menu.Item>;

export default (props) => {
    
    return (
        <Menu mode="horizontal"
              theme="dark"
              selectedKeys={[
                  ['student', 'school', 'company', 'conversations', 'professor', 'login', 'register', 'logout'].find(item => props.location.pathname.indexOf(item) >= 0)
              ]}
              style={{height: '64px', lineHeight: '64px'}}>
            <Menu.Item><Link to="/"><span style={{color: 'white', verticalAlign: 'middle', fontSize: '32px'}}>Piazzza</span></Link></Menu.Item>
            <StudentHome key="student"/>
            <SchoolHome key="school"/>
            <ProfessorHome key="professor"/>
            <CompanyHome key="company"/>
            <Conversations key="conversations"/>
            <Login key="login"/>
            <Register key="register"/>
            <Logout key="logout"/>
            <CompanySearch {...props} key="do-not-pick-me"/>
        </Menu>
    );
};