// @flow
import { getPlaceholder }  from '../../src/selectors/chatSelectors';

import { defaultState } from '../../src/chop/dux';

describe('Chat', () => {
  test('get placeholder for event', () => {
    const result = getPlaceholder(
      {
        ...defaultState,
        feed: {
          ...defaultState.feed,
          panes: {
            primary: {
              type: 'EVENT',
              content: {
                channelId: 'public',
              },
            },
          },
        },
      }
    );
    expect(result).toEqual('chat');
  });

  test('get placeholder for host', () => {
    const result = getPlaceholder(
      {
        ...defaultState,
        feed: {
          ...defaultState.feed,
          panes: {
            primary: {
              type: 'CHAT',
              content: {
                channelId: 'host',
              },
            },
          },
          channels: {
            host: {
              id: '12345',
              name: 'Host',
              moments: [],
              anchorMoments: [],
              participants: [
                {
                  pubnubToken: '12345',
                  name: 'Bobby G.',
                  role: { label: '' },
                },
                {
                  pubnubToken: '54353',
                  name: 'Shaq O.',
                  role: { label: '' },
                },
              ],
              scrollPosition: 0,
            },
          },
        },
      },
      'host',
    );
    expect(result).toEqual('chat_with');
  });

  test('get placeholder for direct chat', () => {
    const result = getPlaceholder(
      {
        ...defaultState,
        feed: {
          ...defaultState.feed,
          channels: {
            ...defaultState.feed.channels,
            direct: {
              id: '12345',
              name: 'Direct',
              type: 'direct',
              moments: [],
              anchorMoments: [],
              participants: [
                {
                  pubnubToken: '12345',
                  name: 'Bobby G.',
                  role: { label: '' },
                },
                {
                  pubnubToken: '54353',
                  name: 'Shaq O.',
                  role: { label: '' },
                },
              ],
              scrollPosition: 0,
            },
          },
          panes: {
            primary: {
              type: 'CHAT',
              content: {
                channelId: 'direct',
              },
            },
          },
        },
        user: {
          currentUser: {
            id: '12345',
            pubnubToken: '12345',
            pubnubAccessKey: '12345',
            name: 'Bobby G.',
            role: {
              label: '',
              permissions: [],
            },
          },
        },
      },
      'direct',
    );
    expect(result).toEqual('chat');
  });
});
