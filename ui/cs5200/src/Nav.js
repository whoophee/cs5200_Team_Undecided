import { NeedsUser } from './component/util/datastore/user';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';

const StudentHome = NeedsUser(['student'])(props => <Menu.Item {...props}><Link to="/student/">Sections</Link></Menu.Item>);
const SchoolHome = NeedsUser(['school'])(props => <Menu.Item {...props}><Link to="/school/">Home</Link></Menu.Item>);
const ProfessorHome = NeedsUser(['professor'])(props => <Menu.Item {...props}><Link to="/professor/">Home</Link></Menu.Item>);
const Conversations = NeedsUser(['student', 'professor', 'company', 'school'])(props => <Menu.Item {...props}><Link to="/conversations/">Messages</Link></Menu.Item>);

const Login = NeedsUser([null])(props => <Menu.Item {...props}><Link to="/login/">Login</Link></Menu.Item>);
const Register = NeedsUser([null])(props => <Menu.Item {...props}><Link to="/register/">Register</Link></Menu.Item>);
const Logout = NeedsUser(['student', 'professor', 'company', 'school'])(props => <Menu.Item {...props}><Link to="/logout/">Log Out</Link></Menu.Item>);

export default (props) => {
    
    return (
        <Menu mode="horizontal"
              theme="dark"
              selectedKeys={[
                  ['student', 'school', 'conversations', 'professor', 'login', 'register', 'logout'].find(item => props.location.pathname.indexOf(item) >= 0)
              ]}
              style={{height: '64px', lineHeight: '64px'}}>
            <Menu.Item><Link to="/"><span style={{color: 'white', verticalAlign: 'middle', fontSize: '32px'}}>Piazzza</span></Link></Menu.Item>
            <StudentHome key="student"/>
            <SchoolHome key="school"/>
            <ProfessorHome key="professor"/>
            <Conversations key="conversations"/>
            <Login key="login"/>
            <Register key="register"/>
            <Logout key="logout"/>
        </Menu>
    );
};