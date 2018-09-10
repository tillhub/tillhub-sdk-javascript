import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Simple from '../react/simple.jsx';

storiesOf('Simple', module)
  .add('auth', () => (
    <Simple></Simple>
  ))
