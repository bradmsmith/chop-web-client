// @flow
import { createStore } from 'redux';
import { addError, removeError, clearErrors } from '../../src/errors/dux';
import reducer from '../../src/chop/dux';
import { defaultState } from '../../src/feed/dux';

describe('Errors tests', () => {
  test('Error messages are added', () => {
    const store = createStore(
      reducer,
      {
        feed: defaultState,
      }
    );
    const errorId = expect.stringMatching(/^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/);
    
    store.dispatch(
      addError('You do not have access to this area of the application.')
    );

    const { lastAction, ...result } = store.getState().feed; // eslint-disable-line no-unused-vars

    expect(result).toEqual(
      {
        ...defaultState,
        errors: [
          {
            id: errorId,
            message: 'You do not have access to this area of the application.',
          },
        ],
      }
    );
  });

  test('Error messages are removed.', () => {
    const store = createStore(
      reducer,
      {
        feed: {
          ...defaultState,
          errors: [
            {
              id: '12345',
              message: 'Email address is required.',
            },
          ],
        },
      }
    );
    
    store.dispatch(
      removeError('12345')
    );

    const { lastAction, ...result } = store.getState().feed; // eslint-disable-line no-unused-vars

    expect(result).toEqual(
      defaultState
    );
  });

  test('Error messages are cleared.', () => {
    const store = createStore(
      reducer,
      {
        feed: {
          ...defaultState,
          errors: [
            {
              id: '12345',
              message: 'Email address is required.',
            },
            {
              id: '67890',
              message: 'You are not authorized.',
            },
          ],
        },
      }
    );

    store.dispatch(
      clearErrors()
    );

    const { lastAction, ...result } = store.getState().feed; // eslint-disable-line no-unused-vars
    
    expect(result).toEqual(
      defaultState
    );
  });
});