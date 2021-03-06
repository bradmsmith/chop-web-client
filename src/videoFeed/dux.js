// @flow
import React from 'react';
import { createSelector } from 'reselect';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import VimeoPlayer from 'react-player/lib/players/Vimeo';
import WistiaPlayer from 'react-player/lib/players/Wistia';
import type {URLType} from '../cwc-types';

// Action Types

const SET_VIDEO = 'SET_VIDEO';
const PLAY_VIDEO = 'PLAY_VIDEO';
const PAUSE_VIDEO = 'PAUSE_VIDEO';
const TOGGLE_HIDE_VIDEO = 'TOGGLE_HIDE_VIDEO';

// Type Definitions

type VideoTypeType = 'videoFeed' | 'simulated' | 'live' | 'offline' | 'none';

type VideoType = {
  type: VideoTypeType,
  url: URLType,
};

type SetVideoType = {
  type: 'SET_VIDEO',
  video: VideoType,
};

type IFramePlayerPropsType = {
  url: string,
};

type SimulatedLivePlayerPropsType = {
  url: string,
  // $FlowFixMe
  Player: React.ComponentType<SimulatedLivePlayerPropsType>,
  startAt: number,
  onPause: () => void,
  onPlay: () => void,
  isVideoPlaying: boolean,
  isMobileDevice: boolean,
};

type OfflinePlayerPropsType = {
  url: string,
  // $FlowFixMe
  Player: React.ComponentType<OfflinePlayerPropsType>,
};

type ToggleHideVideoType = {
  type: 'TOGGLE_HIDE_VIDEO',
  hidden: boolean,
};

// Action Creators

const setVideo = (url: URLType, type: VideoTypeType): SetVideoType => (
  {
    type: SET_VIDEO,
    video: {
      url,
      type,
    },
  }
);

const playVideo = () => (
  {
    type: PLAY_VIDEO,
  }
);

const pauseVideo = () => (
  {
    type: PAUSE_VIDEO,
  }
);

const toggleHideVideo = (hidden: boolean): ToggleHideVideoType => (
  {
    type: TOGGLE_HIDE_VIDEO,
    hidden,
  }
);

// Selectors
const local = state => state.feed || state;

const getVideo = state => local(state).video;

const videoPlayerFactory = createSelector(
  getVideo,
  video => {
    if (video.url.indexOf('jwplayer') > -1) {
      return null;
    } else if (video.url.indexOf('vimeo') > -1) {
      return VimeoPlayer;
    } else if (video.url.indexOf('wistia') > -1) {
      return WistiaPlayer;
    } else if (video.url.indexOf('youtu') > -1) {
      return YouTubePlayer;
    } else {
      return null;
    }
  }
);

const getVideoStartTime = state => local(state).event.videoStartTime;

const videoStartAtTime = createSelector(
  getVideoStartTime,
  (state, now) => now,
  (startTime, now) => Math.floor(now / 1000) - startTime
);

// Exports

export {
  setVideo,
  videoStartAtTime,
  videoPlayerFactory,
  playVideo,
  pauseVideo,
  toggleHideVideo,
};

export type {
  SetVideoType,
  VideoType,
  IFramePlayerPropsType,
  SimulatedLivePlayerPropsType,
  OfflinePlayerPropsType,
  ToggleHideVideoType,
  VideoTypeType,
};

export {
  SET_VIDEO,
  TOGGLE_HIDE_VIDEO,
};
