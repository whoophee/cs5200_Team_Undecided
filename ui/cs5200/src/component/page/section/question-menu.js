import { Row, Spin, Input, Form, Button, Menu, Modal } from 'antd';
import React from 'react';
import { Link } from "react-router-dom";
import { addQuestionForSection } from '../../../api/question';
import { addNoteToSection } from '../../../api/note';
import { NeedsUser, getUserType } from '../../util/datastore/user';

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

class NoteModalFormInner extends React.Component {
    _handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(e);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={this.props.visible}
                title="Post a Note"
                okText="Post Note"
                onOk={this.props.onCreate}
                onCancel={this.props.onCancel}>
                <Spin spinning={this.props.loading}>
                    <Form layout="vertical" onSubmit={this._handleSubmit}>
                        <Form.Item label="Title">
                            {getFieldDecorator('title', {
                                rules: [{required: true, message: "Required"}]
                            })(
                                <Input placeholder="Title"/>
                            )}
                        </Form.Item>
                        <Form.Item label="Text">
                            {getFieldDecorator('body')(
                                <Input.TextArea placeholder="additional details"/>
                            )}
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>  
        );
    }
}

const NoteModalForm = Form.create()(NoteModalFormInner);

const CompositeModalForm = (props) => {
    if (props.note) {
        return <NoteModalForm {...props}/>;
    }
    return <QuestionModalForm {...props}/>;
};

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
    _makePost = (sectionId, post) => {
        if (getUserType(this.props.user) === 'professor') {
            return addNoteToSection(sectionId, post);
        } else {
            return addQuestionForSection(sectionId, post);
        }
    };
    _handleCreateQuestion = (e) => {
        const form = this._questionModalRef.props.form;
        form.validateFields((err, values) => {
            if (err) return;
            this.setState({
                loading: true
            });
            this._makePost(this.props.sectionId, {
                ...values
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
    _renderNote = (note) => {
        return <Menu.Item key={'note' + note.id}>
            <Link to={"/sections/" + this.props.sectionId + "/notes/" + note.id + "/"}>
                {note.title}
            </Link>
        </Menu.Item>
    };
    _renderQuestion = (question) => {
        return (
            <Menu.Item key={'question' + question.id}>
                <Link to={"/sections/" + this.props.sectionId + "/" + question.id + "/"}>
                    {question.text}
                </Link>
            </Menu.Item>
        );
    };
    _renderQuestionSelector() {
        const searchValue = this.state.searchValue.toLowerCase();
        return (
            <Menu selectedKeys={[this.props.postId != null ? 'note' + this.props.postId : 'question' + this.props.questionId]}>
                {this.props.posts.filter(question => {
                    return (question.text || '').toLowerCase().indexOf(searchValue) >= 0
                        || (question.details || '').toLowerCase().indexOf(searchValue) >= 0
                        || (question.title || '').toLowerCase().indexOf(searchValue) >= 0
                        || (question.body || '').toLowerCase().indexOf(searchValue) >= 0;
                }).map((item) => item.title ? this._renderNote(item) : this._renderQuestion(item))}
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
                flexDirection: 'column',
                borderRight: '1px solid #999'
            }}>
                <CompositeModalForm
                    wrappedComponentRef={this._handleQuestionModalRef}
                    visible={this.state.modalVisible}
                    onCreate={this._handleCreateQuestion}
                    onCancel={this._handleCreateQuestionModalToggle}
                    loading={this.state.loading}
                    note={getUserType(this.props.user) === 'professor'}
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

export default NeedsUser(['professor', 'student', 'school'])(QuestionMenu);