import React from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";

class ConversationSelector extends React.Component {
    _renderMenuItems() {
        const conversations = this.props.conversations;

        return conversations.map(conversation => (
            conversation.user1 && conversation.user2 &&
            <Menu.Item key={conversation.id}>
                <Link to={'/conversations/' + conversation.id + '/'}>
                    {this.props.me.id === conversation.user1.id ? conversation.user2.name : conversation.user1.name}
                </Link>
            </Menu.Item>
        ))
    }
    render() {
        return (
            <Menu selectedKeys={[this.props.match.params.selected]}>
                {this._renderMenuItems()}
            </Menu>
        );
    }
};

export default ConversationSelector;