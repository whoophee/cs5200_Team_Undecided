import React from 'react';
import { Form, Input, Button, Card, Row, Col, Radio } from 'antd';
import SchoolInput from '../../util/form/school';
import { registerSchool } from '../../../api/school';
import { registerCompany } from '../../../api/company';
import { registerProfessor } from '../../../api/professor';
import { registerStudent } from '../../../api/student';
import { Link } from "react-router-dom";

const USER_TYPES = {
    STUDENT: "student",
    PROFESSOR: "professor",
    SCHOOL: "school",
    COMPANY: "company"
};

class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: null,
            registered: false
        };
    }
    _handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            const callback = () => {
                this.setState({
                    registered: true
                });
            };
            switch (values.userType) {
                case USER_TYPES.STUDENT:
                    registerStudent({
                        name: values.name,
                        username: values.username,
                        password: values.password,
                        school: values.school
                    }).then(callback);
                    break;
                case USER_TYPES.PROFESSOR:
                    registerProfessor({
                        name: values.name,
                        username: values.username,
                        password: values.password,
                        school: values.school
                    }).then(callback);
                    break;
                case USER_TYPES.SCHOOL:
                    registerSchool({
                        name: values.name,
                        username: values.username,
                        password: values.password,
                    }).then(callback);
                    break;
                case USER_TYPES.COMPANY:
                    registerCompany({
                        name: values.name,
                        username: values.username,
                        password: values.password,
                    }).then(callback);
                    break;
            }
        });
    }
    _validateConfirmPassword = (rule, value, callback) => {
        const {getFieldValue} = this.props.form;
        if (value && getFieldValue('password') !== value) {
            callback('Make sure this password matches the above')
        } else {
            callback();
        }
    }
    _handleChangeUserType = (event) => {
        const {target: {value}} = event;
        this.setState({
            userType: value
        });
    }
    _renderSchoolFormItem() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form.Item key="school" label="School">
                {getFieldDecorator('school', {
                    rules: [{required: true, message: "Please select your school"}]
                })(
                    <SchoolInput/>
                )}
            </Form.Item>
        );
    }
    _maybeRenderStudentForm() {
        if (this.state.userType !== USER_TYPES.STUDENT) {
            return null;
        }
        const {getFieldDecorator} = this.props.form;
        return [
            (
                <Form.Item label="Name" key="name">
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: "Please enter your name"}]
                    })(
                        <Input placeholder="Full Name"/>
                    )}
                </Form.Item>
            ),
            this._renderSchoolFormItem()
        ];
    }
    _maybeRenderProfessorForm() {
        if (this.state.userType !== USER_TYPES.PROFESSOR) {
            return null;
        }
        const {getFieldDecorator} = this.props.form;
        return [
            (
                <Form.Item label="Name" key="name">
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: "Please enter your name"}]
                    })(
                        <Input placeholder="Full Name"/>
                    )}
                </Form.Item>
            ),
            this._renderSchoolFormItem()
        ];
    }
    _maybeRenderSchoolForm() {
        if (this.state.userType !== USER_TYPES.SCHOOL) {
            return null;
        }
        const {getFieldDecorator} = this.props.form;
        return [
            (
                <Form.Item label="School Name" key="name">
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: "Please enter your name"}]
                    })(
                        <Input placeholder="School Name"/>
                    )}
                </Form.Item>
            )
        ];
    }
    _maybeRenderCompanyForm() {
        if (this.state.userType !== USER_TYPES.COMPANY) {
            return null;
        }
        const {getFieldDecorator} = this.props.form;
        return [
            (
                <Form.Item label="Company Name" key="name">
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: "Please enter your name"}]
                    })(
                        <Input placeholder="Company Name"/>
                    )}
                </Form.Item>
            )
        ];
    }
    _renderForm() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="vertical">
                <Form.Item label="Username">
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: "Please enter a username"}]
                    })(
                        <Input placeholder="Username"/>
                    )}
                </Form.Item>
                <Form.Item label="Password">
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: "Please enter a password"}]
                    })(
                        <Input type="password" placeholder="Confirm Password"/>
                    )}
                </Form.Item>
                <Form.Item label="Confirm Password">
                    {getFieldDecorator('confirmPassword', {
                        rules: [
                            {required: true, message: "Please confirm your password"},
                            {validator: this._validateConfirmPassword}
                        ]
                    })(
                        <Input type="password" placeholder="Confirm Password"/>
                    )}
                </Form.Item>
                <Form.Item label="Which best describes you?">
                    {getFieldDecorator('userType', {
                        rules: [{required: true, message: "Please select a user type"}],
                        initialValue: false
                    })(
                        <Radio.Group onChange={this._handleChangeUserType}>
                            <Radio value={USER_TYPES.STUDENT}>Student</Radio>
                            <Radio value={USER_TYPES.PROFESSOR}>Professor</Radio>
                            <Radio value={USER_TYPES.SCHOOL}>School</Radio>
                            <Radio value={USER_TYPES.COMPANY}>Company</Radio>
                        </Radio.Group>
                    )}
                </Form.Item>
                {this._maybeRenderStudentForm()}
                {this._maybeRenderProfessorForm()}
                {this._maybeRenderSchoolForm()}
                {this._maybeRenderCompanyForm()}
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        );
    }
    render() {
        return (
            <Row type="flex" justify="center" onSubmit={this._handleSubmit}>
                <Col span={8}>
                    <Card>
                        <h2>Register</h2>
                        {this.state.registered && "Thank you for registering!"}
                        {!this.state.registered && this._renderForm()}
                        <Link to="/login/">I want to log in</Link>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Form.create()(Component);