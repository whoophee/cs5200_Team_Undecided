import request from 'superagent';

export async function registerStudent(student) {
    const result = await request
        .post('/api/students/')
        .send(student)
        .set('Accept', 'application/json');
    return result.body;
}