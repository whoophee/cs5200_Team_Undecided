import React from 'react';
import { WithLoader } from '../../util/api/loader';
import { getCompanies as getAllCompanies, registerCompany, deleteCompany } from '../../../api/company';
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
                title="Add a New Company"
                okText="Add Company"
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
        return registerCompany(obj);
    };
    _handleRef = ref => this._ref = ref;
    render() {
        const props = this.props;
        return (
            <div>
                <Button type="primary" onClick={this._handleToggleModal}>Add Company</Button>
                <List loading={props.loadStatus === 'loading'} bordered>
                    {props.companys.map(company => (
                        <List.Item key={company.id}
                                actions={[
                                    <Button type="danger" onClick={() => deleteCompany(company.id).then(() => props.reload())}>Delete</Button>
                                ]}>
                            <Link to={"/admin/companies/" + company.id + "/"}>
                                {company.name}
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

export default WithLoader(getAllCompanies, {
    mapLoadToProps: (companys) => ({companys})
})(AdminList);