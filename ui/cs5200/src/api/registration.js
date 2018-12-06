import request from 'superagent';
import { makeObjectGraph } from './util';

export async function getRegistrationForMe(eventId) {
    const result = await request
        .get('/api/students/me/registrations/' + eventId + '/');
    return makeObjectGraph(result.body);
}

export async function createRegistrationForMe(eventId) {
    const result = await request
        .post('/api/students/me/registrations/')
        .send({event: eventId});
    return result.body;
}