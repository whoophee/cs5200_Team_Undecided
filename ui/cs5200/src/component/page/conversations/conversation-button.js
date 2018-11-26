import React from 'react';
import { Row, Button, AutoComplete } from 'antd';
import { getContacts } from '../../../api/conversation';

class ConversationButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            selectedUserId: null
        };
    }
    _handleSelect = (value) => this.setState({selectedUserId: value});
    _handleSearch = (value) => {
        getContacts(value).then(resultBody => {
            this.setState({
                dataSource: resultBody.map(item => ({
                    value: item.id,
                    text: item.name
                }))
            })
        });
    };
    _handleNewConversation = (e) => {
        if (this.state.selectedUserId == null) return;
        this.props.onNewConversation(parseInt(this.state.selectedUserId));
    };
    render() {
        return (
            <div>
                <Row>
                    <AutoComplete
                        onSelect={this._handleSelect}
                        dataSource={this.state.dataSource}
                        onSearch={this._handleSearch}/>
                </Row>
                <Row>
                    <Button type="primary" onClick={this._handleNewConversation}>
                        New Conversation
                    </Button>
                </Row>
            </div>
        );
    }
};

export default ConversationButton;