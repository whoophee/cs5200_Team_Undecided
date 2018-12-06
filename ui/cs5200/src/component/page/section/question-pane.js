import React from 'react';
import { Row, Card, Spin } from 'antd';
import { WithLoader } from '../../util/api/loader';
import { getQuestionWithAnswers, addAnswerToQuestion, addProfessorAnswerToQuestion } from '../../../api/question';
import { getNote } from '../../../api/note';
import AnswerComposer from './answer-composer';
import { WithUser, getUserType } from '../../util/datastore/user';


class QuestionPane extends React.Component {
    _renderAnswers() {
        const answers = this.props.question.answers || [];
        return (
            <Row style={{flexGrow: 1, overflowY: 'scroll'}}>
                <Spin spinning={this.props.loadStatus === 'loading'}>  
                {answers.length === 0 && "Looks like nobody has answered this yet :("}
                {answers.map(answer => {
                    return (
                        <Row key={answer.id}>
                            <Card style={{backgroundColor: !answer.enrollment && '#fafafa', borderWidth: !answer.enrollment && '3px'}} title={answer.enrollment ? answer.enrollment.id.student.name : 'Professor ' + answer.section.professor.name}>
                                {answer.text}
                            </Card>
                        </Row>
                    );
                })}
                </Spin>
            </Row>
        );
    }
    _renderQuestion() {
        const question = this.props.question;
        return (
            <Row>
                <Card title={question.text}>
                    {question.details}
                </Card>
            </Row>
        );
    }
    _renderNote() {
        const note = this.props.question;
        return (
            <Row>
                <Card title={note.title}>
                    {note.body}
                </Card>
            </Row>
        );
    }
    _addAnswerOrProfAnswerToQuestion = (questionId, answer) => {
        if (getUserType(this.props.user) === 'student') {
            return addAnswerToQuestion(questionId, answer);
        } else if (getUserType(this.props.user) === 'professor') {
            return addProfessorAnswerToQuestion(questionId, answer);
        } else {
            return Promise.resolve();
        }
    };
    _handleAnswer = (values) => {
        this._addAnswerOrProfAnswerToQuestion(this.props.question.id, values).then(() => this.props.reload());
    };
    _renderAnswerComposer() {
        return (
            <Row>
                <AnswerComposer question={this.props.question} onSubmit={this._handleAnswer}/>
            </Row>
        );
    }
    render() {
        return (
            <div style={{
                minHeight: '100%',
                maxHeight: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {this.props.postId == null && this._renderQuestion()}
                {this.props.postId == null && this._renderAnswers()}
                {this.props.postId == null && this._renderAnswerComposer()}
                {this.props.postId != null && this._renderNote()}
            </div>
        );
    }
}

const getQuestionOrNoteWithAnswers = ([questionId, postId]) => {
    if (postId != null) {
        return getNote(postId);
    } else {
        return getQuestionWithAnswers(questionId);
    }
};

export default WithUser(WithLoader(getQuestionOrNoteWithAnswers, {
    loadArg: (props) => [props.questionId, props.postId],
    mapLoadToProps: (question) => ({question})
})(QuestionPane));