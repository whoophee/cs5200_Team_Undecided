import React from 'react';
import { List, Input, Button, Spin, Row, Icon, Modal, Form } from 'antd';
import Loader from '../../util/api/loader';
import { Link } from "react-router-dom";
import { getClassesForMe, addClassForMe } from '../../../api/class';

const renderListItem = (curClass) => {
    return (
        <List.Item actions={[
            <Link to={"/school/classes/" + curClass.id + "/"}>Edit</Link>
        ]}>
            <List.Item.Meta
                title={curClass.courseNumber + " - " + curClass.name}
                description={curClass.description}/>
        </List.Item>
    );
};

const ClassesList = (props) => <List bordered dataSource={props.classes} renderItem={renderListItem}/>;

const mapClassesToProps = (classes) => {
    return {classes};
};

class ClassModalFormInner extends React.Component {
    _handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(e);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={this.props.visible}
                title="Add a New Class"
                okText="Add Class"
                onOk={this.props.onCreate}
                onCancel={this.props.onCancel}>
                <Spin spinning={this.props.loading}>
                    <Form layout="vertical" onSubmit={this._handleSubmit}>
                        <Form.Item label="Course Number">
                            {getFieldDecorator('courseNumber', {
                                rules: [{required: true, message: "Please enter a course number"}]
                            })(
                                <Input placeholder="course number"/>
                            )}
                        </Form.Item>
                        <Form.Item label="Name">
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: "Please enter a name"}]
                            })(
                                <Input placeholder="name"/>
                            )}
                        </Form.Item>
                        <Form.Item label="Description">
                            {getFieldDecorator('description')(
                                <Input placeholder="description"/>
                            )}
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>  
        );
    }
}

const ClassModalForm = Form.create()(ClassModalFormInner);

class Component extends React.Component {
    _reloadRef = null;
    _formRef = null;

    _onReloadRef = (reloadRef) => this._reloadRef = reloadRef;

    _handleFormRef = (formRef) => this._formRef = formRef;

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false
        };
    }

    _handleAddNewClassToggle = (event) => {
        this.setState({
            modalVisible: !this.state.modalVisible,
            loading: false
        });
    };

    _handleAddClass = () => {
        const form = this._formRef.props.form;
        form.validateFields((err, values) => {
            if (err) return;
            this.setState({
                loading: true
            });
            addClassForMe({
                name: values.name,
                description: values.description,
                courseNumber: values.courseNumber
            }).then(() => {
                form.resetFields();
                this.setState({
                    modalVisible: false,
                    loading: false
                });
                this._reloadRef();
            });
        });
    }

    _loadClasses = async () => {
        return await getClassesForMe();
    };
    render() {
        return (
            <div>
                <ClassModalForm
                    wrappedComponentRef={this._handleFormRef}
                    visible={this.state.modalVisible}
                    onCreate={this._handleAddClass}
                    onCancel={this._handleAddNewClassToggle}
                    loading={this.state.loading}/>
                <Row type="flex" justify="space-between">
                    <h1>Classes</h1>
                    <Button type="primary" onClick={this._handleAddNewClassToggle}>
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