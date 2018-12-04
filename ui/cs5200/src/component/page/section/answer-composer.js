import React from 'react';
import { Form, Input, Button } from 'antd';

class AnswerComposer extends React.Component {
    _handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            
            this.props.onSubmit(values);
            this.props.form.resetFields();
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form style={{display: 'flex'}}>
                <Form.Item style={{flexGrow: 1}}>
                    {getFieldDecorator('text')(
                        <Input.TextArea style={{width: '100%'}} placeholder="your answer"/>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={this._handleSubmit}>Submit</Button>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create()(AnswerComposer);