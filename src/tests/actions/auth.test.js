import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import {
  login,
  logout,
  startLoginEmailPassword,
  startLogout,
} from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
describe('Preubas con las acciones de auth.js', () => {
  beforeEach(() => {
    store = mockStore(initState);
  });
  test('Login y Logut deben de crear la accion respectiva', () => {
    const uid = 'ABC123';
    const displayName = 'Pedro';

    const loginAction = login(uid, displayName);
    const logoutAction = logout();

    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid,
        displayName,
      },
    });
    expect(logoutAction).toEqual({
      type: types.logout,
    });
  });
  test('debe de realizar el logut startLogout', async () => {
    await store.dispatch(startLogout());

    const actions = store.getActions();
    console.log(actions);

    expect(actions[0]).toEqual({
      type: types.logout,
    });

    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning,
    });
  });
  test('debe de iniciar el startLoginWithEmailandPassword', async () => {
    const email = 'pedro@gmail.com';
    const password = '123456';

    await store.dispatch(startLoginEmailPassword(email, password));

    const actions = store.getActions();

    console.log(actions);

    expect(actions[0]).toEqual({
      type: types.uiStartLoading,
    });

    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: '7C1a7r4zyahGap0E4Qo1y3Dy2T92',
        displayName: null,
      },
    });

    expect(actions[2]).toEqual({
      type: types.uiFinishLoading,
    });
  });
});
