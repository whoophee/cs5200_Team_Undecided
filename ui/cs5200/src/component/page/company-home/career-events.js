import React from 'react';
import { List, Button, Row, Icon, Form, Modal, Spin, Input } from 'antd';
import { WithLoader } from '../../util/api/loader';
import { Link } from 'react-router-dom';
import { getCareerEventsForMe, addCareerEventForMe } from '../../../api/career-events';
import SchoolSelector from '../../util/form/school';

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
                    </Form>
                </Spin>
            </Modal>  
        );
    }
}

const AddCareerEventModal = Form.create()(AddCareerEventModalInner);


export class CareerEventsPage extends React.Component {
    _formRef = null;

    _handleFormRef = (formRef) => this._formRef = formRef;

    _handleCreateCareerEvent = (data) => {
        const form = this._formRef.props.form;
        form.validateFields((err, values) => {
            if (err) return;
            this.setState({
                modalLoading: true
            });
            addCareerEventForMe(
                {
                    name: values.name,
                    school: values.school,
                    description: values.description,
                    location: values.location
                }).then(() => {
                form.resetFields();
                this.setState({
                    modalVisible: false,
                    modalLoading: false
                });
                this.props.reload();
            });
        });
    };

    _handleAddNewCareerEventToggle = () => this.setState({modalVisible: !this.state.modalVisible});

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            modalLoading: false
        };
    }
    _renderCareerEvents() {
        const careerEvents = this.props.careerEvents;

        return (
            <List bordered>
                {careerEvents.map(event => {
                    return (
                        <List.Item key={event.id}>
                            <Link to={"/events/" + event.id + "/"}>
                                {event.name}
                                {' - '}
                                {event.school.name}
                                {' - '}
                                {event.location}
                            </Link>
                            
                        </List.Item>
                    );
                })};
            </List>
        );
    }
    render() {
        return (
            <div>
                <AddCareerEventModal
                    wrappedComponentRef={this._handleFormRef}
                    visible={this.state.modalVisible}
                    onCreate={this._handleCreateCareerEvent}
                    onCancel={this._handleAddNewCareerEventToggle}
                    loading={this.state.modalLoading}
                    professor={this.props.professor}/>
                <Row type="flex" justify="space-between">
                    <h1>Career Events</h1>
                    <Button type="primary" onClick={this._handleAddNewCareerEventToggle}>
                        <Icon type="plus-circle"/>
                        Add New Career Event
                    </Button>
                </Row>
                <Row>
                    {this._renderCareerEvents()}
                </Row>
            </div>
        );
    }
}

export default WithLoader(getCareerEventsForMe, {
    mapLoadToProps: (careerEvents) => ({careerEvents})
})(CareerEventsPage);