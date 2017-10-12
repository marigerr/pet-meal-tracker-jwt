import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory, Router } from 'react-router';
import routes from './routes.js';
import './scss/layout.scss';
import './images/pawprintWhite128.png';
import './manifest.json';
import './service-worker.js';
import registerServiceWorker from './registerServiceWorker';

ReactDom.render((
  <Router history={browserHistory} routes={routes} />
), document.getElementById('root'));

registerServiceWorker();
