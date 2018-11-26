import React from 'react';
import Loader from '../../util/api/loader';
import { getConversationWithMessages, sendMessage } from '../../../api/conversation';
import { Spin, Row, Card, Form, Input, Button } from 'antd';

export class MessagePaneInner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            composerLoading: false
        };
    }
    _handleMessageSend = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            this.setState({
                composerLoading: true
            });
            sendMessage(this.props.conversation.id, values).then(() => {
                this.setState({
                    composerLoading: false
                });
                this.props.form.resetFields();
                this.props.reload().then(this._scrollMessagesToBottom);
            });
        })
    }
    _renderComposer() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Spin spinning={this.state.composerLoading}>
                <Row>
                    <Form style={{display: 'flex'}}>
                        <Form.Item style={{flexGrow: 1, margin: '2px 0'}}>
                            {getFieldDecorator('text')(
                                <Input.TextArea style={{width: '100%'}} placeholder="your message"/>
                            )}
                        </Form.Item>
                        <Form.Item style={{padding: '5px', margin: '2px 0'}}>
                            <Button type="primary" onClick={this._handleMessageSend}>Send</Button>
                        </Form.Item>
                    </Form>
                </Row>
            </Spin>
        );
    }
    _messagePaneRef = null;
    _handleMessagePaneRef = (ref) => this._messagePaneRef = ref;
    _scrollMessagesToBottom = () => {
        this._messagePaneRef.scrollTo(0, this._messagePaneRef.scrollHeight);
    };
    _renderMessages() {
        const messages = this.props.conversation.messages;
        const me = this.props.user;

        return (
            <div style={{flexGrow: 1, overflowY: 'scroll'}} ref={this._handleMessagePaneRef}>
                <Spin spinning={this.props.loadStatus === 'loading'} style={{display: 'flex'}}>
                    {messages.map(message => {
                        return (
                            <Row key={message.id} style={{with: '100%'}} type="flex" justify={message.user.id === me.id ? "end" : "start"}>
                                <Card>
                                    <Row>
                                        <h4>{message.user.name}</h4>
                                    </Row>
                                    <Row>
                                        {message.text}
                                    </Row>
                                </Card>
                            </Row>
                        );
                    })}
                </Spin>
            </div>
        );
    }
    render() {
        if (this.props.user === null) return <Spin/>;
        return (
            <div style={{
                minHeight: '100%',
                maxHeight: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {this._renderMessages()}
                {this._renderComposer()}
            </div>
            
        )
    }
}

const MessagePaneInnerWithUser = Form.create()(MessagePaneInner);

const mapLoadToProps = (conversation) => ({conversation});

const MessagePane = (props) => (<Loader load={getConversationWithMessages} mapLoadToProps={mapLoadToProps} loadArg={props.match.params.id} component={MessagePaneInnerWithUser} {...props}/>);

export default MessagePane;