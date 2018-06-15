//@flow
import reducer,
{
  defaultState,
} from '../../../src/io/dom/dux';
import { toggleChatFocus } from '../../../src/chat/dux';
import { changeChannel } from '../../../src/feed/dux';

describe('DOM tests', () => {
  test('reducer with no action', () => {
    const result = reducer();
    expect(result).toEqual(defaultState);
  });

  test('set focus', () => {
    window.scroll = jest.fn();
    expect(document.body).toBeDefined();
    jest.useFakeTimers();
    window.innerHeight = 328;
    if (document.body) document.body.scrollTop = 50;
    reducer(
      defaultState,
      toggleChatFocus(true)
    );
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 200);
    if (document.body) expect(document.body.style.height).not.toEqual('328px');
    if (document.body) expect(document.body.scrollTop).toEqual(50);
    jest.runAllTimers();
    if (document.body) expect(document.body.style.height).toEqual('328px');
    expect(window.scroll).toBeCalledWith({
      top: 0,
      behavior: 'instant',
    });
  });

  test('set focus', () => {
    window.scroll = jest.fn();
    expect(document.body).toBeDefined();
    if (document.body) document.body.scrollTop = 50;
    reducer(
      defaultState,
      toggleChatFocus(false)
    );
    if (document.body) expect(document.body.style.height).toEqual('100%');
    expect(window.scroll).toBeCalledWith({
      top: 0,
      behavior: 'instant',
    });
  });

  test('change channel', () => {
    const anchor = document.createElement('a');
    anchor.setAttribute('id', 'nav-default');
    // $FlowFixMe
    anchor.getBoundingClientRect = jest.fn();
    anchor.getBoundingClientRect.mockReturnValueOnce(
      {
        left: 50,
        width: 100,
      }
    );
    document.getElementsByTagName('body')[0].appendChild(anchor);
    const result = reducer(
      defaultState,
      changeChannel('default')
    );
    expect(result.linkXPos).toEqual(50);
    expect(result.linkWidth).toEqual(100);
  });
});