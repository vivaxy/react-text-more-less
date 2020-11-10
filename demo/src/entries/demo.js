/**
 * @since 2017-02-20 10:25
 * @author vivaxy
 */
import React from 'react';
import { render } from 'react-dom';
import Demo from '../containers/Demo';

const root = document.querySelector('.js-root');
render(<Demo />, root);

if (module.hot) {
    module.hot.accept('../containers/Demo', () => {
        render(<Demo />, root);
    });
}
