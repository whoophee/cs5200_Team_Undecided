import request from 'superagent';
import { makeObjectGraph } from './util';

export async function getConversationWithMessages(conversationId) {
    const result = await request.get('/api/conversations/' + conversationId + '/');
    return makeObjectGraph(result.body);
}

export async function getConversations() {
    const result = await request.get('/api/me/conversations/');
    return makeObjectGraph(result.body);
}

export async function addNewConversation(conversation) {
    const result = await request.post('/api/me/conversations/')
        .send(conversation);
    return makeObjectGraph(result.body);
}

export async function sendMessage(conversationId, message) {
    const result = await request.post('/api/conversations/' + conversationId + '/messages/')
        .send(message);
    return makeObjectGraph(result.body);
}

export async function getContacts(name) {
    const result = await request.get('/api/me/contacts/')
        .query({
            name
        });
    return makeObjectGraph(result.body);
}