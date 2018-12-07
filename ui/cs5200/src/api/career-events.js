import request from 'superagent';
import { makeObjectGraph } from './util';

export async function getCareerEventsForMe() {
    const result = await request
        .get('/api/me/careerevents/');
    return makeObjectGraph(result.body);
}

export async function addCareerEventForMe(careerEvent) {
    const result = await request
        .post('/api/me/careerevents/')
        .send(careerEvent);
    return result.body;
}

export async function addCareerEvent(companyId, careerEvent) {
    const result = await request
        .post('/api/companies/' + companyId + '/careerevents/')
        .send(careerEvent);
    return result.body;
}

export async function getCareerEvent(id) {
    const result = await request
        .get('/api/careerevents/' + id + '/');
    return makeObjectGraph(result.body);
}

export async function approveCareerEvent(id) {
    const result = await request
        .put('/api/careerevents/' + id + '/approve/')
        .send({approved: true});
    return result.body;
}

export async function updateEvent(id, event) {
    const result = await request
        .put('/api/careerevents/' + id + '/')
        .send(event);
    return result.body;
}

export async function deleteEvent(id) {
    const result = await request
        .delete('/api/careerevents/' + id + '/');
    return result.body;
}