import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Route, Redirect } from "react-router-dom";
import Classes from './classes';
import Sections from './sections';
import ClassesEdit from './class/index';

class Component extends React.Component {
    _renderSider() {
        const path = this.props.match.path;
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={['class']}
                style={{height: '100%'}}>
                <Menu.Item key="class">
                    <Link to={path + "classes/"}>Classes</Link>
                </Menu.Item>
                <Menu.Item key="section">
                    <Link to={path + "sections/"}>Sections</Link>
                </Menu.Item>
                <Menu.Item key="professor">
                    <Link to={path + "professors/"}>Professors</Link>
                </Menu.Item>
                <Menu.Item key="student">
                    <Link to={path + "students/"}>Students</Link>
                </Menu.Item>
            </Menu>
        )
    }
    _redirectToClasses = () => {
        return <Redirect to={this.props.match.path + 'classes/'}/>;
    };
    _renderContent() {
        const path = this.props.match.path;
        return (
            <div style={{padding: '10px'}}>
                <Route path={path} exact render={this._redirectToClasses}/>
                <Route path={path + 'classes/:id/'} exact component={ClassesEdit}/>
                <Route path={path + 'classes/'} exact component={Classes}/>
                <Route path={path + 'sections/'} exact component={Sections}/>
            </div>
        );
    }
    render() {
        return (
            <Layout style={{padding: '24px 0px', margin: '0 100px', backgroundColor: '#fff'}}>
                <Layout.Sider width={300} height="100%">
                    {this._renderSider()}
                </Layout.Sider>
                <Layout.Content>
                    {this._renderContent()}
                </Layout.Content>
            </Layout>
        );
    }
}

export default Component;