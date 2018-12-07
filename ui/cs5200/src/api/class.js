import request from 'superagent';
import { makeObjectGraph } from './util';

export async function getClassesForMe(schoolId) {
    const result = await request.get('/api/school/me/classes/');
    return makeObjectGraph(result.body);
}

export async function getClassWithSections(classId) {
    const result = await request.get('/api/classes/' + classId + '/');
    return makeObjectGraph(result.body);
}

export async function addClassForMe(classData) {
    const result = await request.post('/api/school/me/classes/')
        .send(classData);
    return result.body;
}

export async function deleteClass(classId) {
    const result = await request.delete('/api/classes/' + classId + '/');
    return makeObjectGraph(result.body);
}