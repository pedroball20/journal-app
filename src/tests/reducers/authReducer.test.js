import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Pruebas en authReducer', () => {
  test('Prueba Login', () => {
    const initState = {};

    const action = {
      type: types.login,
      payload: {
        uid: 'abc',
        displayName: 'Pedro',
      },
    };

    const state = authReducer(initState, action);

    expect(state).toEqual({
      uid: 'abc',
      name: 'Pedro',
    });
  });

  test('Prueba Logout', () => {
    const initState = {
      uid: 'sdfsdfsdfsdfsdfsdf',
      name: 'Pedro',
    };

    const action = {
      type: types.logout,
    };

    const state = authReducer(initState, action);

    expect(state).toEqual({});
  });

  test('Prueba Default no hace cambios al state', () => {
    const initState = {
      uid: 'sdfsdfsdfsdfsdfsdf',
      name: 'Pedro',
    };

    const action = {
      type: 'dgsg',
    };

    const state = authReducer(initState, action);

    expect(state).toEqual(initState);
  });
});
