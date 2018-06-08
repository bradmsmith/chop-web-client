// @flow
import React from 'react';
import type {MomentType} from './dux';
import Message from '../components/message';
import styles from './styles.css';

type FeedProps = {
  moments: Array<MomentType>,
  channel: string,
  appendingMessage: boolean,
};

type RefObject = { current: any };

type FeedState = {
  height: number,
  top: string,
}

class Feed extends React.Component<FeedProps, FeedState> {
  listRef: RefObject
  wrapperRef: RefObject

  constructor (props: FeedProps) {
    super(props);
    // $FlowFixMe
    this.listRef = React.createRef();
    // $FlowFixMe
    this.wrapperRef = React.createRef();
    this.state = {
      height: 0,
      top: '100%',
    };
  }

  componentDidUpdate () {
    const listHeight = this.listRef.current.scrollHeight;
    const wrapper = this.wrapperRef.current;
    const wrapperHeight = Math.ceil(wrapper.getBoundingClientRect().height);
    if (listHeight !== this.state.height &&
        wrapperHeight !== this.state.height) {
      if (listHeight > wrapperHeight) {
        this.setState(
          {
            height: wrapperHeight,
            top: '0px',
          }
        );
      } else {
        this.setState(
          {
            height: listHeight,
            top: `calc(100% - ${listHeight}px)`,
          }
        );
      }
    } else if (this.state.top === '0px') {
      const callback = () => {
        wrapper.scrollBy(0, 4);
        if (wrapper.scrollHeight - wrapperHeight > wrapper.scrollTop) {
          window.requestAnimationFrame(callback);
        }
      };
      window.requestAnimationFrame(callback);
    }
  }

  render () {
    let listItems = [];
    if (this.props.moments) {
      listItems = this.props.moments.map((moment, index) => {
        const appendMessage = this.props.appendingMessage && index === this.props.moments.length - 1;
        return (
          <li key={moment.id}>
            <Message
              message={moment}
              appendingMessage={appendMessage}
            />
          </li>
        );
      });
    }

    return (
      <div
      // $FlowFixMe
        ref={this.wrapperRef}
        className={styles.wrapper}
      >
        <ul
          style={{top: this.state.top}}
          // $FlowFixMe
          ref={this.listRef}
          key={this.props.channel}
          className={styles.feed}
        >
          {listItems}
        </ul>
      </div>
    );
  }
}

export default Feed;
