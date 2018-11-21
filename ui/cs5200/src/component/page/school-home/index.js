import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Route } from "react-router-dom";
import Classes from './classes';

class Component extends React.Component {
    _renderSider() {
        const path = this.props.match.path;
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={['class']}>
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
    _renderContent() {
        const path = this.props.match.path;
        return (
            <div style={{padding: '10px'}}>
                <Route path={path + 'classes/'} component={Classes}/>
                Lol
            </div>
        );
    }
    render() {
        return (
            <Layout style={{padding: '24px 0px', margin: '0 100px', backgroundColor: '#fff'}}>
                <Layout.Sider width={300}>
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