import request from 'superagent';

export async function registerCompany(company) {
    const result = await request
        .post('/api/companies/')
        .send(company)
        .set('Accept', 'application/json');
    return result.body;
}