import React from 'react';
import { List, Button, Row, Icon, Form, Modal, Spin, Input } from 'antd';
import Loader from '../../util/api/loader';
import { getSectionsForMe } from '../../../api/section';
import ProfessorSelector from '../../util/form/professor';
import ClassSelector from '../../util/form/class';
import { addSectionForProfessor, approveSection } from '../../../api/section';

const renderListItem = (curSection) => {
    return (
        <List.Item actions={[
            <Button key="approve" onClick={() => approveSection(curSection.id)}>
                <Icon type="check-circle"/>
                Approve
            </Button>
        ]}>
            <List.Item.Meta
                title={[
                    curSection.schoolClass.name,
                    'Professor ' + curSection.professor.name,
                    curSection.name
                ].join(' - ')}
                description={curSection.description}/>
        </List.Item>
    );
};

const SectionsList = (props) => <Spin spinning={props.loadStatus === 'loading'}><List bordered dataSource={props.sections} renderItem={renderListItem}/></Spin>;

const mapSectionsToProps = (sections) => {
    return {sections};
};

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
                        <Form.Item label="Class">
                            {getFieldDecorator('class', {
                                rules: [{required: true, message: "Please select a class"}]
                            })(
                                <ClassSelector/>
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


export class SectionsPage extends React.Component {
    _formRef = null;
    _reloadRef = null;

    _handleFormRef = (formRef) => this._formRef = formRef;

    _handleReloadRef = (reloadRef) => this._reloadRef = reloadRef;

    _handleCreateSection = (data) => {
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
                    schoolClass: values.class
                }).then(() => {
                form.resetFields();
                this.setState({
                    modalVisible: false,
                    modalLoading: false
                });
                this._reloadRef();
            });
        });
    };

    _handleAddNewSectionToggle = () => this.setState({modalVisible: !this.state.modalVisible});

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            modalLoading: false
        };
    }
    render() {
        return (
            <div>
                <AddSectionModal
                    wrappedComponentRef={this._handleFormRef}
                    visible={this.state.modalVisible}
                    onCreate={this._handleCreateSection}
                    onCancel={this._handleAddNewSectionToggle}
                    loading={this.state.modalLoading}/>
                <Row type="flex" justify="space-between">
                    <h1>Sections</h1>
                    <Button type="primary" onClick={this._handleAddNewSectionToggle}>
                        <Icon type="plus-circle"/>
                        Add New Section
                    </Button>
                </Row>
                <Row>
                    <Loader load={getSectionsForMe} mapLoadToProps={mapSectionsToProps} reloadRef={this._handleReloadRef} component={SectionsList}/>
                </Row>
            </div>
        );
    }
}

export default SectionsPage;