import request from 'superagent';
import { makeObjectGraph } from './util';

export async function registerStudent(student) {
    const result = await request
        .post('/api/students/')
        .send(student)
        .set('Accept', 'application/json');
    return result.body;
}

export async function getStudentsForMe() {
    const result = await request
        .get('/api/me/students/');
    return makeObjectGraph(result.body);
}