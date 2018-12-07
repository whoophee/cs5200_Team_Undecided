import React from 'react';
import { WithLoader } from '../../util/api/loader';
import SchoolSelector from '../../util/form/school';
import { getAllSchools, registerSchool, deleteSchool } from '../../../api/school';
import { Modal, Form, Spin, List, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

class ModalFormInner extends React.Component {
    _handleSubmit = (e) => {
        e.preventDefault();
        this.props.onCreate();
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={this.props.visible}
                title="Add a New School"
                okText="Add School"
                onOk={this.props.onCreate}
                onCancel={this.props.onCancel}>
                <Spin spinning={this.props.loading}>
                    <Form layout="vertical" onSubmit={this._handleSubmit}>
                        <Form.Item label="Name">
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: "Please enter a name"}]
                            })(
                                <Input placeholder="name"/>
                            )}
                        </Form.Item>
                        <Form.Item label="Username">
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: "Please enter a username"}]
                            })(
                                <Input placeholder="name"/>
                            )}
                        </Form.Item>
                        <Form.Item label="Password">
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: "Please enter a password"}]
                            })(
                                <Input type="password" placeholder="password"/>
                            )}
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>  
        );
    }
}

const ModalForm = Form.create()(ModalFormInner);

class AdminList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            modalLoading: false
        };
    }
    _handleToggleModal = () => this.setState({modalVisible: !this.state.modalVisible});
    _handleCreate = () => {
        this._ref.props.form.validateFields((err, values) => {
            if (err) return;
            this._ref.props.form.resetFields();
            this.setState({modalLoading: true});
            this._create(values).then(() => {
                this.setState({modalLoading: false, modalVisible: false});
                this.props.reload();
            });
        });
    };
    _create(obj) {
        return registerSchool(obj);
    };
    _handleRef = ref => this._ref = ref;
    render() {
        const props = this.props;
        return (
            <div>
                <Button type="primary" onClick={this._handleToggleModal}>Add School</Button>
                <List loading={props.loadStatus === 'loading'} bordered>
                    
                    {props.schools.map(school => (
                        <List.Item key={school.id}
                                actions={[
                                    <Button type="danger" onClick={() => deleteSchool(school.id).then(() => props.reload())}>Delete</Button>
                                ]}>
                            <Link to={"/admin/schools/" + school.id + "/"}>
                                {school.name}
                            </Link>
                        </List.Item>
                    ))}
                    <ModalForm
                        wrappedComponentRef={this._handleRef}
                        visible={this.state.modalVisible}
                        loading={this.state.modalLoading}
                        onCancel={this._handleToggleModal}
                        onCreate={this._handleCreate}
                        />
                </List>
            </div>
        );
    }
}

export default WithLoader(getAllSchools, {
    mapLoadToProps: (schools) => ({schools})
})(AdminList);