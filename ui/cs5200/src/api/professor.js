import request from 'superagent';

export async function registerProfessor(professor) {
    const result = await request
        .post('/api/professors/')
        .send(professor)
        .set('Accept', 'application/json');
    return result.body;
}