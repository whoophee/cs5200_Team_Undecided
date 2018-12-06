import request from 'superagent';
import { makeObjectGraph } from './util';

export async function addNoteToSection(sectionId, note) {
    const result = await request
        .post('/api/sections/' + sectionId + '/notes/')
        .send(note);
    return makeObjectGraph(result.body);
};

export async function getNote(noteId) {
    const result = await request
        .get('/api/notes/' + noteId + '/');
    return makeObjectGraph(result.body);
};