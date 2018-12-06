import request from 'superagent';
import { makeObjectGraph } from './util';

export async function addQuestionForSection(sectionId, question) {
    const result = await request.post('/api/sections/' + sectionId + '/questions/')
        .send(question);
    return result.body;
}

export async function getQuestionWithAnswers(questionId) {
    const result = await request.get('/api/questions/' + questionId + '/');
    return makeObjectGraph(result.body);
}

export async function addAnswerToQuestion(questionId, answer) {
    const result = await request.post('/api/questions/' + questionId + '/answers/')
        .send(answer);
    return result.body;
}

export async function addProfessorAnswerToQuestion(questionId, answer) {
    const result = await request.post('/api/questions/' + questionId + '/answersP/')
        .send(answer);
    return result.body;
}