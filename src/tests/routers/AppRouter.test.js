/**
 * @jest-environment node
 */
import 'jsdom-global/register';
import * as fs from 'fs';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { firebase } from '../../firebase/firebase-config';
import { configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { AppRouter } from '../../routers/AppRouter';
// import { act } from 'react-dom/test-utils';
import { act } from '@testing-library/react';
import { login } from '../../actions/auth';
import Swal from 'sweetalert2';

// const userMock = { uid: 123456, displayName: 'pedro@gmail.com' };
// const authMock = {
//   firebase: {
//     auth: () => ({
//       signOut: jest.fn(),
//       signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ userMock })),
//       onAuthStateChanged: jest.fn((callback) => callback(userMock)),
//     }),
//   },
// };
// jest.mock('../../firebase/firebase-config', () => authMock);

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

jest.mock('../../actions/auth', () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
configure({ adapter: new Adapter() });

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: 'ABC',
    },
    notes: [],
  },
};
let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <AppRouter/>', () => {
  test('Debe de llamar el login si estoy autenticado', async () => {
    let user;
    await act(async () => {
      const userCred = await firebase
        .auth()
        .signInWithEmailAndPassword('pedro@gmail.com', '123456');
      user = userCred.user;

      console.log(userCred);

      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(login).toHaveBeenCalled();
  });
});
