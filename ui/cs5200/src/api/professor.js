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

export async function deleteProfessor(id) {
    const result = await request.delete('/api/professors/' + id + '/');
    return result.body;
}

export async function getAllProfessors() {
    const result = await request
        .get('/api/professors/');
    return makeObjectGraph(result.body);
}

export async function getProfessor(id) {
    const result = await request.get('/api/professors/' + id + '/');
    return makeObjectGraph(result.body);
}

export async function editProfessor(obj) {
    const result = await request.put('/api/professors/' + obj.id + '/')
        .send(obj);
    return result.body;
}