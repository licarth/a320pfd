import Rx from 'rxjs/Rx';
import _ from 'lodash';
import { timeInterval } from 'rxjs/operator/timeInterval';

window.addEventListener("deviceorientation", handleOrientation, true);

const data = {
    airspeed: 250,
    alt: 0,
    overspeed: 200,
    ap: {
        targetSpeed: 140,
    }
};

const fps = 30;
const interval = 1000 / fps;

let absolute;
let alpha;
let beta;
let gamma;

let latitude;
let longitude;
let altitude;
let speed;

const handleOrientation = (event) => {
    event.alpha
    event.beta
    event.gamma
}

const watchId = navigator.geolocation.watchPosition((position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    altitude = position.coords.altitude;
    speed = position.coords.speed;
});

export default () => Rx.Observable.interval(interval)
    .map(timeInterval => {
        data.airspeed = Math.max(0, speed * 1.94384);
        data.altitude = altitude * 3.28084
        // console.log(data.altitude)
        return data;
    })