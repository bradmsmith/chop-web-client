// @flow
import React from 'react';

import type { ActionableNotificationType } from './dux';
import AudioPlayer from '../../components/audioPlayer';
// $FlowFixMe - why won't these resolve?
import PopPopMp3 from '../../../assets/audio/pop_pop.mp3';
// $FlowFixMe - why won't these resolve?
import PopPopOgg from '../../../assets/audio/pop_pop.ogg';
import ChatNotification from '../../../assets/chat-notification.svg';
import type {SharedUserType} from '../../users/dux';
import { Trans, useTranslation } from 'react-i18next';
import { Wrapper as NotificationWrapper, Text, Timestamp, Icon } from '../notification/styles';
import { ActionableWrapper, ActionableContainer, AcceptButton, AcceptedText } from './styles';

type ActionableNotificationPropsType = {
  notification: ActionableNotificationType,
  acceptPrayerRequest: (prayerChannel: string, hostChannel:string, user: SharedUserType, accepted: boolean) => void,
  hostChannel: string,
  isCompact: boolean,
};

const ActionableNotification = (
  {
    notification,
    acceptPrayerRequest,
    hostChannel,
    isCompact,
  }: ActionableNotificationPropsType,
) => {
  const {
    active,
    cancelled,
    user,
    timestamp,
    prayerChannel,
  } = notification;

  const { t } = useTranslation('moments');

  const Wrapper =
    active ? ActionableWrapper : NotificationWrapper;

  const acceptedText =
    cancelled ? t('actionable.cancelled') : t('actionable.accepted');

  const callAcceptPrayerRequest = () => acceptPrayerRequest(prayerChannel, hostChannel, user, false);

  return (
    <Wrapper data-testid='actionableNotification' isCompact={isCompact}>
      <ActionableContainer>
        <Icon dangerouslySetInnerHTML={{ __html: ChatNotification }} isCompact={isCompact} data-testid={'actionableNotification-icon'}/>
        <Text data-testid={'actionableNotification-message'} isCompact={isCompact}>
          <div data-testid='actionableNotification-text'>
            <Trans ns='moments' i18nKey='prayer.request'>
              {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
              <strong>{{name: user.name}}</strong> has requested prayer
            </Trans>
          </div>
          <Timestamp data-testid='actionableNotification-timestamp'>{timestamp}</Timestamp>
        </Text>
        {
          active &&
            <>
              <AcceptButton
                data-testid='actionableNotification-accept'
                onClick={callAcceptPrayerRequest}
                isCompact={isCompact}
              >
                {t('actionable.accept')}
              </AcceptButton>
              <AudioPlayer
                url={[PopPopMp3, PopPopOgg]}
              />
            </>
        }
        <AcceptedText hide={active} data-testid='actionableNotification-accepted' isCompact={isCompact}>{acceptedText}</AcceptedText>
      </ActionableContainer>
    </Wrapper>
  );
};

export default React.memo < ActionableNotificationPropsType > (ActionableNotification);
