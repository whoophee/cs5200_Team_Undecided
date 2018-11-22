import request from 'superagent';
import { makeObjectGraph } from './util';

export async function registerProfessor(professor) {
    const result = await request
        .post('/api/professors/')
        .send(professor)
        .set('Accept', 'application/json');
    return result.body;
}

export async function getProfessors() {
    const result = await request
        .get('/api/me/professors/');
    return makeObjectGraph(result.body);
}