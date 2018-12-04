import React from 'react';
import { Row, Card, Spin } from 'antd';
import { WithLoader } from '../../util/api/loader';
import { getQuestionWithAnswers, addAnswerToQuestion } from '../../../api/question';
import AnswerComposer from './answer-composer';

class QuestionPane extends React.Component {
    _renderAnswers() {
        const answers = this.props.question.answers;
        return (
            <Row style={{flexGrow: 1, overflowY: 'scroll'}}>
                <Spin spinning={this.props.loadStatus === 'loading'}>  
                {answers.length === 0 && "Looks like nobody has answered this yet :("}
                {answers.map(answer => {
                    return (
                        <Row key={answer.id}>
                            <Card title={answer.enrollment.id.student.name}>
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
    _handleAnswer = (values) => {
        addAnswerToQuestion(this.props.question.id, values).then(() => this.props.reload());
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
                {this._renderQuestion()}
                {this._renderAnswers()}
                {this._renderAnswerComposer()}
            </div>
        );
    }
}

export default WithLoader(getQuestionWithAnswers, {
    loadArg: (props) => props.questionId,
    mapLoadToProps: (question) => ({question})
})(QuestionPane);