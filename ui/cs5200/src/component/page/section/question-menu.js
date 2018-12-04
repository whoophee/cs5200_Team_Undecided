import { Row, Spin, Input, Form, Button, Menu, Modal } from 'antd';
import React from 'react';
import { Link } from "react-router-dom";
import { addQuestionForSection } from '../../../api/question';

class QuestionModalFormInner extends React.Component {
    _handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(e);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={this.props.visible}
                title="Ask a Question"
                okText="Ask Question"
                onOk={this.props.onCreate}
                onCancel={this.props.onCancel}>
                <Spin spinning={this.props.loading}>
                    <Form layout="vertical" onSubmit={this._handleSubmit}>
                        <Form.Item label="Question">
                            {getFieldDecorator('text', {
                                rules: [{required: true, message: "Required"}]
                            })(
                                <Input placeholder="your question"/>
                            )}
                        </Form.Item>
                        <Form.Item label="Additional Details">
                            {getFieldDecorator('details')(
                                <Input.TextArea placeholder="additional details"/>
                            )}
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>  
        );
    }
}

const QuestionModalForm = Form.create()(QuestionModalFormInner);

class QuestionMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            loading: false,
            searchValue: ""
        };
    }
    _questionModalRef = null;
    _handleQuestionModalRef = (ref) => this._questionModalRef = ref;
    _handleCreateQuestion = (e) => {
        const form = this._questionModalRef.props.form;
        form.validateFields((err, values) => {
            if (err) return;
            this.setState({
                loading: true
            });
            addQuestionForSection(this.props.sectionId, {
                text: values.text,
                details: values.details
            }).then(() => {
                form.resetFields();
                this.setState({
                    modalVisible: false,
                    loading: false
                });
                this.props.reload();
            });
        });
    };
    _handleCreateQuestionModalToggle = (e) => {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    };
    _renderCreateQuestion() {
        return (
            <Button type="primary" onClick={this._handleCreateQuestionModalToggle}>Ask Question</Button>
        );
    }
    _renderQuestion = (question) => {
        return (
            <Menu.Item key={question.id}>
                <Link to={"/sections/" + this.props.sectionId + "/" + question.id + "/"}>
                    {question.text}
                </Link>
            </Menu.Item>
        );
    }
    _renderQuestionSelector() {
        const searchValue = this.state.searchValue.toLowerCase();
        return (
            <Menu selectedKeys={[this.props.questionId]}>
                {this.props.questions.filter(question => {
                    return question.text.toLowerCase().indexOf(searchValue) >= 0
                        || question.details.toLowerCase().indexOf(searchValue) >= 0;
                }).map(this._renderQuestion)}
            </Menu>
        );
    }
    _handleSearch = (e) => {
        this.setState({
            searchValue: e.target.value
        });
    };
    _renderSearchQuestions() {
        return (
            <Input style={{flexShrink: 1}} onChange={this._handleSearch} value={this.state.searchValue} placeholder="search for question"/>
        );
    }
    render() {
        return (
            <div style={{
                display: 'flex',
                maxHeight: '100%',
                minHeight: '100%',
                flexDirection: 'column'
            }}>
                <QuestionModalForm
                    wrappedComponentRef={this._handleQuestionModalRef}
                    visible={this.state.modalVisible}
                    onCreate={this._handleCreateQuestion}
                    onCancel={this._handleCreateQuestionModalToggle}
                    loading={this.state.loading}
                    />
                <Row type="flex" style={{flexWrap: 'nowrap'}}>
                    {this._renderSearchQuestions()}
                    {this._renderCreateQuestion()}
                </Row>
                <Row style={{
                    overflowY: 'scroll',
                    flexGrow: 1
                }}>
                    {this._renderQuestionSelector()}
                </Row>
            </div>
        )
    }
}

export default QuestionMenu;