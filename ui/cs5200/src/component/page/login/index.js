import React from 'react';
import { Form, Input, Button, Card, Row, Col } from 'antd';
import { Link, Redirect } from "react-router-dom";
import { update } from '../../util/datastore/user';
import { login } from '../../../api/user';
import User from '../../util/datastore/user';

class Component extends React.Component {
    _handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            login(values.username, values.password).then(body => {
                if (body != null) update(() => ({user: body}));
            })
        });
    }
    render() {
        if (this.props.user) {
            return <Redirect to="/"/>;
        }
        const {getFieldDecorator} = this.props.form;
        return (
            <Row type="flex" justify="center">
                <Col span={8}>
                    <Card>
                        <h2>Log In</h2>
                        <Form layout="vertical" onSubmit={this._handleSubmit}>
                            <Form.Item label="Username">
                                {getFieldDecorator('username')(
                                    <Input placeholder="Username"/>
                                )}
                            </Form.Item>
                            <Form.Item label="Password">
                                {getFieldDecorator('password')(
                                    <Input type="password" placeholder="Password"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log In
                                </Button>
                            </Form.Item>
                        </Form>
                        <Link to="/register/">I need to register</Link>
                    </Card>
                </Col>
            </Row> 
        );
    }
}

const WithUser = (props) => <User component={Component} {...props}/>

export default Form.create()(WithUser);