import request from 'superagent';

export async function getLoggedInUserData() {
    const result = await request
        .get('/api/users/me/');
    return result.body;
}

export async function login(username, password) {
    const result = await request
        .post('/api/users/login/')
        .send({username})
        .send({password})
        .type('form');
    return result.body;
}