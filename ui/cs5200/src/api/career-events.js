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

export async function getCareerEvent(id) {
    const result = await request
        .get('/api/careerevents/' + id + '/');
    console.log('hmm');
    const result2 = makeObjectGraph(result.body);
    console.log(result2);
    return result2;
}