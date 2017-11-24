import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Pfd from './Pfd';
import Rx from 'rxjs/Rx';
import registerServiceWorker from './registerServiceWorker';

const pfd = <Pfd airspeed="90"/>;
ReactDOM.render(pfd, document.getElementById('root'));
registerServiceWorker();



