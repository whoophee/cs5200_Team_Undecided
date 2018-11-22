import request from 'superagent';
import { makeObjectGraph } from './util';

export async function getSectionsForMe() {
    const result = await request.get('/api/me/sections/');
    return makeObjectGraph(result.body);
}

export async function addSectionForProfessor(professorId, sec) {
    const result = await request.post('/api/professors/' + professorId + '/sections/')
        .send(sec);
    return result.body;
}