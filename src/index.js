import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Pfd from './Pfd';
import Rx from 'rxjs/Rx';
import _ from 'lodash';
import registerServiceWorker from './registerServiceWorker';


let airspeed = 311;

const flightDataObs = Rx.Observable.interval(30)
    .timeInterval()
    .map(() => {
        // airspeed -= _.random(-0.2, 0.2, true);
        airspeed -= 0.2;
        // airspeed = 311;
        return {
            airspeed
        };
    })
    .takeWhile(({airspeed}) => airspeed > 0)

const pfd = <Pfd flightDataObs={flightDataObs} />;
ReactDOM.render(pfd, document.getElementById('root'));
registerServiceWorker();



