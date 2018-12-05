import request from 'superagent';
import { makeObjectGraph } from './util';

export async function registerCompany(company) {
    const result = await request
        .post('/api/companies/')
        .send(company)
        .set('Accept', 'application/json');
    return result.body;
}

export async function getCompanies() {
    const result = await request.get('/api/companies/');
    return makeObjectGraph(result.body);
}

export async function searchCompanies(text) {
    const result = await request
        .get('/api/companies/search/')
        .query({text});
    return makeObjectGraph(result.body);
}