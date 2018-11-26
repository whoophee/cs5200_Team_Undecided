import React from 'react';
import { Layout, Row, Spin } from 'antd';
import { Route } from "react-router-dom";
import MessagePane from './message-pane';
import ConversationButton from './conversation-button';
import ConversationSelector from './conversation-selector';
import Loader from '../../util/api/loader';
import { addNewConversation, getConversations } from '../../../api/conversation';
import { WithUser } from '../../util/datastore/user';

class ConversationPage extends React.Component {
    _handleNewConversation = (otherUserId) => {
        addNewConversation({
            user1: this.props.user.id,
            user2: otherUserId
        }).then((resultingId) => {
            const path = this.props.match.path;
            this.props.reload().then(() => {
                this.props.history.push(path + resultingId + '/');
            });
        });
    };
    _renderSider() {
        const path = this.props.match.path;
        return (
            <div style={{
                display: 'flex',
                maxHeight: '100%',
                minHeight: '100%',
                flexDirection: 'column'
            }}>
                <Row>
                    <ConversationButton onNewConversation={this._handleNewConversation}/>
                </Row>
                <Row style={{
                    overflowY: 'scroll',
                    flexGrow: 1
                }}>
                    <Route path={path} exact render={this._renderConversationSelector}/>
                    <Route path={path + ':selected/'} exact render={this._renderConversationSelector}/>
                </Row>
            </div>
        );
    }
    _renderMessagePane = (props) => <MessagePane {...props} user={this.props.user}/>;
    _renderConversationSelector = (props) => <ConversationSelector me={this.props.user} conversations={this.props.conversations} {...props}/>;
    render() {
        const path = this.props.match.path;
        if (this.props.user === null) return <Spin/>;
        return (
            <Layout>
                    <Layout.Sider style={{overflowY: 'hidden'}} height="100%">
                        {this._renderSider()}
                    </Layout.Sider>
                    <Layout.Content style={{overflowY: 'hidden'}}>
                        <Route path={path + ':id/'} exact render={this._renderMessagePane}/>
                    </Layout.Content>
            </Layout>
        )
    }
}
const mapLoadToProps = (conversations) => ({conversations});
const ConversationPageWrapper = (props) => <Loader load={getConversations} mapLoadToProps={mapLoadToProps} component={ConversationPage} {...props}/>;

export default WithUser(ConversationPageWrapper);