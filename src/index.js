import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Pfd from './Pfd';
import Rx from 'rxjs/Rx';
import _ from 'lodash';
import registerServiceWorker from './registerServiceWorker';
import InputSelector from './InputSelector';
import App from './App';

// let airspeed = 160;
// let overspeed = 170;


// Play data progressively
// const period = 3; //milliseconds

// const corsProxy = "https://cors-anywhere.herokuapp.com/";
// const flightDataObs1 = Rx.Observable
//     .fromPromise(fetch(corsProxy + "https://vectr.com/licarth/c5gpjlNy0E.svg"))
//     .flatMap(r => Rx.Observable.fromPromise(r.text()))
//     .flatMap(text => {
//         const re = new RegExp(/[0-9]{1,4}.[0-9]{2}L[0-9]{1,4}.[0-9]{1,2}/g)
//         let m;
//         let speeds = []
//         do {
//             m = re.exec(text);
//             if (m) {
//                 const [val, t] = m[0].split('L')
//                 speeds.push({ t: Number(t), val: Number(val) })
//             }
//         } while (m);

//         speeds = _.sortBy(speeds, ({ t, val }) => t);

//         console.log(speeds)

//         let index = 0;
//         return Rx.Observable.interval(period)
//             .timeInterval()
//             .flatMap((interval) => {
//                 let currentT = interval.value * period / 10;
//                 while (speeds[index + 1] && speeds[index + 1].t < currentT) {
//                     index++;
//                 }
//                 if (index + 1 >= speeds.length) {
//                     // return Rx.Observable.empty();
//                 } else {
//                     //linear interpolation
//                     const dT = speeds[index + 1].t - speeds[index].t
//                     const dVal = speeds[index + 1].val - speeds[index].val
//                     const dAirspeed = dVal / dT
//                     airspeed = speeds[index].val + dAirspeed * (currentT - speeds[index].t)
//                 }
//                 return Rx.Observable.of({
//                     airspeed,
//                     clb: true
//                 });
//             })
//             .takeWhile(({ airspeed }) => airspeed > -10000)
//     })

// const flightDataObs2 = Rx.Observable.interval(15)
//     .timeInterval()
//     .flatMap((interval) => {
//         airspeed -= 0.05;
//         // overspeed +=0.1;
//         return Rx.Observable.of({
//             airspeed,
//             overspeed,
//             clb: true
//         });
//     })
//     .takeWhile(({ airspeed }) => airspeed > -10000)

// let device;
// let interfaces;
// let iface;


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
