import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../src/components/Button';

storiesOf('Button', module)
  .add('with text', () => (
    <Button click={action('clicked')} text="Hello Button" />
  )) 