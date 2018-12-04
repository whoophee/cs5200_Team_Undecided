import request from 'superagent';
import { makeObjectGraph } from './util';

export async function getSectionsForMe() {
    const result = await request.get('/api/me/sections/');
    return makeObjectGraph(result.body);
}

export async function approveSection(sectionId) {
    const result = await request.patch('/api/sections/' + sectionId + '/')
        .send({approved: true});
    return result.body;
}

export async function addSectionForProfessor(professorId, sec) {
    const result = await request.post('/api/professors/' + professorId + '/sections/')
        .send(sec);
    return result.body;
}

export async function getSectionWithQuestions(sectionId) {
    const result = await request.get('/api/sections/' + sectionId + '/');
    return makeObjectGraph(result.body);
}

export async function enrollMeInSection(sectionId) {
    const result = await request.post('/api/me/enroll/')
        .send({id: sectionId});
    return result.body;
}

export async function getSectionsByName(name) {
    const result = await request.get('/api/sections/search/')
        .query({name});
    return makeObjectGraph(result.body);
}