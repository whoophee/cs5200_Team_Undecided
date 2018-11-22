import request from 'superagent';
import { makeObjectGraph } from './util';

export async function getAllSchools() {
    const result = await request
        .get('/api/schools/');
    return makeObjectGraph(result.body);
}

export async function getSchool(id) {
    const result = await request
        .get('/api/schools/' + id + '/');
    return makeObjectGraph(result.body);
}

export async function registerSchool(school) {
    const result = await request
        .post('/api/schools/')
        .send(school)
        .set('Accept', 'application/json');
    return result.body;
}