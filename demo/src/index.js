/**
 * @since 2020-11-11 19:12
 * @author vivaxy
 */
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';

const ROOT = document.querySelector('.js-root');
ReactDOM.render(<App />, ROOT);

if (module.hot) {
  module.hot.accept('./App.js', () => {
      render(<App />, ROOT);
  });
}
