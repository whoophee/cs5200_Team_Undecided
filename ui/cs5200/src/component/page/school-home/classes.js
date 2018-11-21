import React from 'react';
import { List, Input, Button, Card, Row, Icon } from 'antd';
import Loader from '../../util/api/loader';

const ClassesList = (props) => <List dataSource={this.props.classes} renderItem={this._renderListItem}/>;

const mapClassesToProps = (classes) => {

};

class Component extends React.Component {
    _reloadRef = null;

    _onReloadRef = (reloadRef) => this._reloadRef = reloadRef;

    _handleAddNewClass = (event) => {

    };

    _loadClasses = async () => {
        
    };
    render() {
        return (
            <div>
                <Row type="flex" justify="end">
                    <Button type="primary" onClick={this._handleAddNewClass}>
                        <Icon type="plus-circle"/>
                        Add New Class
                    </Button>
                </Row>
                <Row>
                    <Loader load={this._loadClasses} mapLoadToProps={mapClassesToProps} reloadRef={this._onReloadRef} component={ClassesList}/>
                </Row>
            </div>
        );
    }
}

export default Component;