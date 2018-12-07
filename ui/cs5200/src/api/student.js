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

export async function getAllStudents() {
    const result = await request
        .get('/api/students/');
    return makeObjectGraph(result.body);
}

export async function deleteStudent(id) {
    const result = await request.delete('/api/students/' + id + '/');
    return result.body;
}

export async function getStudent(id) {
    const result = await request.get('/api/students/' + id + '/');
    return makeObjectGraph(result.body);
}

export async function editStudent(obj) {
    const result = await request.put('/api/students/' + obj.id + '/')
        .send(obj);
    return result.body;
}