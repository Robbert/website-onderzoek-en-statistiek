/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';

const App = () => (
  <div>
    <Switch>
      <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default App;
