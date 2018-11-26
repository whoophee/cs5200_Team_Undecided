import React from 'react';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';
import QuestionPane from './question-pane';

class SectionPage extends React.Component {
    _renderSider() {

    }
    _renderEmptyPane = () => {
        return "No question selected";
    };
    _renderContent() {
        const path = this.props.match.path;
        return (
            <div>
                <Route path={path} exact render={this._renderEmptyPane}/>
                <Route path={path + 'questions/:id'} exact component={QuestionPane}/>
            </div>
        );
    }
    render() {
        
        return (
            <Layout style={{backgroundColor: '#fff'}}>
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

export default SectionPage;