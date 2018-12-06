import React from 'react';
import { Card, Input, Button, Form, Spin } from 'antd';
import { NeedsUser, reloadData } from '../../util/datastore/user';
import { updateMe } from '../../../api/company';

class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };
    }
    _handleSaveChanges = (e) => {
        this.props.form.validateFields((err, values) => {
            if (err) return;
            this.setState({
                loading: true
            });
            updateMe(values).then(reloadData).then(() => {
                this.setState({
                    loading: false
                });
            });
        });
    };
    render() {
        const company = this.props.user;
        const getFieldDecorator = this.props.form.getFieldDecorator;
        return (
            <div>
                <Spin spinning={this.state.loading}>
                <h1>My Profile</h1>
                <Card>
                    <Card.Meta
                        title={<h1>{company.name}</h1>}
                        description={
                            <div>
                                Headquarters: {getFieldDecorator('headquartersText', {
                                    initialValue: company.headquartersText
                                })(<Input/>)}<br/>
                                Size: {getFieldDecorator('size', {
                                    initialValue: company.size
                                })(<Input/>)}<br/>
                                Industry: {getFieldDecorator('industry', {
                                    initialValue: company.industry
                                })(<Input/>)}
                            </div>
                        }/>
                    <br/>
                    <h2>About</h2>
                    {getFieldDecorator('description', {
                        initialValue: company.description
                    })(<Input.TextArea/>)}
                </Card><br/>
                <Button type="primary" onClick={this._handleSaveChanges}>Save Changes to Profile</Button>
                </Spin>
            </div>
        );
    }
}

export default NeedsUser(['company'])(Form.create()((CompanyProfile)));