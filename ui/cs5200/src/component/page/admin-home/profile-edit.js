import React from 'react';
import { Card, Form, Input, Button, List, DatePicker, Modal, Spin } from 'antd';
import { getStudent, editStudent } from '../../../api/student';
import { getCompanyWithCareerEvents as getCompany, editCompany } from '../../../api/company';
import { addCareerEvent } from '../../../api/career-events';
import { getProfessor, editProfessor } from '../../../api/professor';
import { getSchool, editSchool } from '../../../api/school';
import { WithLoader } from '../../util/api/loader';
import SchoolSelector from '../../util/form/school';
import { deleteEvent } from '../../../api/career-events';
import { Link } from 'react-router-dom';

class AddCareerEventModalInner extends React.Component {
    _handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(e);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={this.props.visible}
                title="Add a New Career Event"
                okText="Add Career Event"
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
                        <Form.Item label="School">
                            {getFieldDecorator('school', {
                                rules: [{required: true, message: "Please select a school"}]
                            })(
                                <SchoolSelector/>
                            )}
                        </Form.Item>
                        <Form.Item label="Location">
                            {getFieldDecorator('location', {
                                rules: [{required: true, message: "Please enter a location"}]
                            })(
                                <Input placeholder="location"/>
                            )}
                        </Form.Item>
                        <Form.Item label="Description">
                            {getFieldDecorator('description', {
                                rules: [{required: true, message: "Please enter a description"}]
                            })(
                                <Input.TextArea/>
                            )}
                        </Form.Item>
                        <Form.Item label="Date/Time">
                            {getFieldDecorator('date', {
                                rules: [{required: true, message: "Please select a date/time"}]
                            })(
                                <DatePicker.RangePicker showTime/>
                            )}
                        </Form.Item>

                    </Form>
                </Spin>
            </Modal>  
        );
    }
}

const AddCareerEventModal = Form.create()(AddCareerEventModalInner);

class ProfileEdit extends React.Component {
    _onSubmit = (e) => {
        this.props.form.validateFields((err, values) => {
            if (err) return;
            this.props.onSubmit(Object.assign({}, this.props.user, values, {
                '@id': undefined,
                classes: undefined,
                careerEvents: undefined
            })).then(() => this.props.reload());
        });
    };
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            modalLoading: false
        };
    }
    _handleCreateCareerEvent = () => {
        this._ref.props.form.validateFields((err, values) => {
            if (err) return;
            this.setState({
                modalLoading: true
            });
            addCareerEvent(this.props.user.id,
                {
                    name: values.name,
                    school: values.school,
                    description: values.description,
                    location: values.location,
                    start: values.date[0].valueOf(),
                    end: values.date[1].valueOf()
                }).then(() => {
                this._ref.props.form.resetFields();
                this.setState({
                    modalVisible: false,
                    modalLoading: false
                });
                this.props.reload();
            });

        });
    };
    _handleAddNewCareerEventToggle = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    };
    _handleFormRef = (ref) => this._ref = ref;
    _renderCareerEventList() {
        return (
            <div>
                <h2>Career Events</h2>
                <AddCareerEventModal
                    wrappedComponentRef={this._handleFormRef}
                    visible={this.state.modalVisible}
                    onCreate={this._handleCreateCareerEvent}
                    onCancel={this._handleAddNewCareerEventToggle}
                    loading={this.state.modalLoading}/>
                <Button type="primary" onClick={this._handleAddNewCareerEventToggle}>Add Event</Button>
                <List bordered>
                    {this.props.user.careerEvents.map(event => (
                        <List.Item key={event.id}
                            actions={[
                                <Button type="danger" onClick={() => deleteEvent(event.id).then(() => this.props.reload())}>Delete</Button>
                            ]}>
                            <Link to={"/admin/companies/" + this.props.user.id + "/events/" + event.id + "/"}>
                                {event.school.name}
                                {' - '}
                                {event.name}
                            </Link>
                        </List.Item>
                    ))}
                </List><br/>
            </div>
            
        );
    }
    render() {
        return (
            <Card loading={this.props.loadStatus === 'loading'}>
                <Form layout="vertical">
                    {Object.keys(this.props.user).map(fieldName => {
                        const val = this.props.user[fieldName];
                        if (Array.isArray(val)) return null;
                        if (typeof val === 'object' && fieldName !== 'school') return null;
                        if (fieldName === 'password' || fieldName === 'id' || fieldName === '@id' || fieldName === 'token') return null;
                        return (
                            <Form.Item key={fieldName} label={fieldName}>
                                {this.props.form.getFieldDecorator(fieldName, {
                                    initialValue: typeof this.props.user[fieldName] === 'object'
                                        ? this.props.user[fieldName].id
                                        : this.props.user[fieldName]
                                })(
                                    fieldName === 'school' ?
                                    <SchoolSelector/> : fieldName === 'description' ?
                                    <Input.TextArea/> :
                                    <Input/>
                                )}
                            </Form.Item>);
                    })}
                    {this.props.user.careerEvents && this._renderCareerEventList()}
                    <Form.Item>
                        <Button type="primary" onClick={this._onSubmit}>Save</Button>
                    </Form.Item>
                </Form>
                
            </Card>
        );
    }
}

const ProfileForm = Form.create()(ProfileEdit);

const WithSubmitter = (submit) => (props) => <ProfileForm {...props} onSubmit={submit}/>

export const StudentProfile = WithLoader(getStudent, {
    loadArg: (props) => props.match.params.id,
    mapLoadToProps: (user) => ({user})
})(WithSubmitter(editStudent));

export const SchoolProfile = WithLoader(getSchool, {
    loadArg: (props) => props.match.params.id,
    mapLoadToProps: (user) => ({user})
})(WithSubmitter(editSchool));

export const CompanyProfile = WithLoader(getCompany, {
    loadArg: (props) => props.match.params.id,
    mapLoadToProps: (user) => ({user})
})(WithSubmitter(editCompany));

export const ProfessorProfile = WithLoader(getProfessor, {
    loadArg: (props) => props.match.params.id,
    mapLoadToProps: (user) => ({user})
})(WithSubmitter(editProfessor));

export default ProfileForm;