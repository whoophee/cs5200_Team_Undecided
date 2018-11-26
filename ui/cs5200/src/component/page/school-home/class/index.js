import React from 'react';
import { addClassForMe, getClassWithSections } from '../../../../api/class';
import { addSectionForProfessor } from '../../../../api/section';
import ProfessorSelector from '../../../util/form/professor';
import { Input, Button, Spin, Row, Icon, Modal, Form, List } from 'antd';
import Loader from '../../../util/api/loader';

const renderListItem = (curSection) => {
    return (
        <List.Item key={curSection.id}>
            <List.Item.Meta
                title={curSection.name}
                description={curSection.description}/>
        </List.Item>
    );
};

const SectionsList = (props) => <List bordered dataSource={props.sections} renderItem={renderListItem}/>;

class AddSectionModalInner extends React.Component {
    _handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(e);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={this.props.visible}
                title="Add a New Section"
                okText="Add Section"
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
                        <Form.Item label="Professor">
                            {getFieldDecorator('professor', {
                                rules: [{required: true, message: "Please select a professor"}]
                            })(
                                <ProfessorSelector/>
                            )}
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>  
        );
    }
}

const AddSectionModal = Form.create()(AddSectionModalInner);

class Component extends React.Component {
    _formRef = null;

    _handleFormRef = (formRef) => this._formRef = formRef;

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            modalVisible: false,
            modalLoading: false
        };
    }

    _handleAddNewSectionToggle = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    };
    _loadSectionsForClass = () => {
        return Promise.resolve(this.props.class.sections.map(section => ({...section, schoolClass: this.props.class})));
    };
    _handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            this.setState({
                loading: true
            });
            // this is a hack, add also updates
            // lol
            addClassForMe({
                ...values,
                id: this.props.class.id
            }).then(() => {
                this.props.reload().then(() => {
                    this.setState({
                        loading: false
                    });
                })
            });
        });
    }
    _handleCreateSection = () => {
        const form = this._formRef.props.form;
        form.validateFields((err, values) => {
            if (err) return;
            this.setState({
                modalLoading: true
            });
            addSectionForProfessor(
                values.professor,
                {
                    name: values.name,
                    schoolClass: this.props.class.id
                }).then(() => {
                form.resetFields();
                this.setState({
                    modalVisible: false,
                    modalLoading: false
                });
                this.props.reload();
            });
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Spin spinning={this.state.loading}>
                <div>
                    <AddSectionModal
                        wrappedComponentRef={this._handleFormRef}
                        visible={this.state.modalVisible}
                        onCreate={this._handleCreateSection}
                        onCancel={this._handleAddNewSectionToggle}
                        loading={this.state.modalLoading}/>
                    <Row>
                        <h1>Edit Class</h1>
                    </Row>
                    <Row>
                        <Form layout="vertical" onSubmit={this._handleSubmit}>
                            <Form.Item label="Course Number">
                                {getFieldDecorator('courseNumber', {
                                    rules: [{required: true, message: "Please enter a course number"}],
                                    initialValue: this.props.class.courseNumber
                                })(
                                    <Input placeholder="course number"/>
                                )}
                            </Form.Item>
                            <Form.Item label="Name">
                                {getFieldDecorator('name', {
                                    rules: [{required: true, message: "Please enter a name"}],
                                    initialValue: this.props.class.name
                                })(
                                    <Input placeholder="name"/>
                                )}
                            </Form.Item>
                            <Form.Item label="Description">
                                {getFieldDecorator('description', {
                                    initialValue: this.props.class.description
                                })(
                                    <Input placeholder="description"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Save</Button>
                            </Form.Item>
                        </Form>
                    </Row>
                    <Row type="flex" justify="space-between">
                        <h1>Sections</h1>
                        <Button type="primary" onClick={this._handleAddNewSectionToggle}>
                            <Icon type="plus-circle"/>
                            Add New Section
                        </Button>
                    </Row>
                    <Row>
                        <SectionsList sections={this.props.class.sections}/>
                    </Row>
                </div>
            </Spin>
        );
    }
}

const mapLoadToProps = (data) => ({class: data});

const WrappedComponent = (props) => <Loader {...props} load={() => getClassWithSections(props.match.params.id)} mapLoadToProps={mapLoadToProps} component={Component}></Loader>;

export default Form.create()(WrappedComponent);