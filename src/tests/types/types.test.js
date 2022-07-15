import { types } from '../../types/types';

describe('pruebas en type.js', () => {
  test('debe de tener estos types', () => {
    expect(types).toEqual({
      login: '[Auth] Login',
      logout: '[Auth] Logout',

      uiSetError: '[UI] Set Error',
      uiRemoveError: '[UI] Remove Error',

      uiStartLoading: '[UI] Start loading',
      uiFinishLoading: '[UI] Finish loading',

      notesAddNew: '[Notes] New note',
      notesActive: '[Notes] Set active note',
      notesLoad: '[Notes] Load notes',
      notesUpdated: '[Notes] Update note',
      notesFileUrl: '[Notes] Update image url',
      notesDelete: '[Notes] Delete note',
      notesLogoutCleaning: '[Notes] Logout Cleaning',
    });
  });
});
