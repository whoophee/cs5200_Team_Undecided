import React from 'react';
import { Form, Input, Button, Card, Row, Col } from 'antd';
import { Link } from "react-router-dom";

class Component extends React.Component {
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Row type="flex" justify="center">
                <Col span={8}>
                    <Card>
                        <h2>Log In</h2>
                        <Form layout="vertical">
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

export default Form.create()(Component);