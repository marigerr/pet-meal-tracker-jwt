import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory, Router } from 'react-router';
import routes from './routes.js';
import './service-worker.js';
import registerServiceWorker from './registerServiceWorker';
import './scss/layout.scss';
import './manifest.json';
import './favicon.png';

import './images/android-chrome-192x192.png';
import './images/android-chrome-512x512.png';
import './images/apple-touch-icon.png';
// import './images/browserconfig.xml';
import './images/favicon-16x16.png';
import './images/favicon-32x32.png';
// import './images/mstile-70x70.png';
// import './images/mstile-144x144.png';
// import './images/mstile-150x150.png';
// import './images/mstile-310x150.png';
// import './images/mstile-310x310.png';
import './images/pawprintWhite24.png';
import './images/pawprintWhite128.png';




ReactDom.render((
  <Router history={browserHistory} routes={routes} />
), document.getElementById('root'));

registerServiceWorker();
