/**
 * @jest-environment node
 */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as fs from 'fs';
import {
  startLoadingNotes,
  startNewNote,
  startSaveNote,
  startUploading,
} from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';
import { fileUpload } from '../../helpers/fileUpload';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../helpers/fileUpload', () => {
  return {
    fileUpload: () => {
      return Promise.resolve('https://misfotos.com/photo.png');
    },
  };
});

const initState = {
  auth: {
    uid: 'TESTING',
  },
  notes: {
    active: {
      id: '8TJihonga1htBw00ZG5p',
      title: 'Hola jeje',
      body: 'Mundo hehe',
    },
  },
};

let store = mockStore(initState);

describe('Pruebas en notes-action', () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test('Debe de crear una nueva nota startNewNote', async () => {
    await store.dispatch(startNewNote());

    const actions = store.getActions();
    // console.log(actions);

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });

    const { id: docId } = actions[1].payload;
    await db.doc(`TESTING/journal/notes/${docId}`).delete();
  });

  /**
   * para que corriera esta prueba agregue Si a alguien le sirve, solo tienen que agregar:
--env=node
en su package.json, en el script de test
   */
  test('StartLoadingNotes debe cargar las notas ', async () => {
    await store.dispatch(startLoadingNotes('TESTING'));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };

    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test('startSaveNote debe grabar la nota', async () => {
    const note = {
      id: '8TJihonga1htBw00ZG5p',
      title: 'titulo',
      body: 'cuerpo',
    };

    await store.dispatch(startSaveNote(note));

    const actions = store.getActions();
    // console.log(actions);
    expect(actions[0].type).toBe(types.notesUpdated);

    const docRef = await db.doc(`TESTING/journal/notes/${note.id}`).get();

    expect(docRef.data().title).toBe(note.title);
  });

  test('startUploading debe de actualizar el url del entry', async () => {
    const file = [];

    await store.dispatch(startUploading(file));
    const docRef = await db
      .doc(`TESTING/journal/notes/8TJihonga1htBw00ZG5p`)
      .get();
    expect(docRef.data().url).toBe('https://misfotos.com/photo.png');
  });
});
