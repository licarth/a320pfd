import Rx from 'rxjs/Rx';
import _ from 'lodash';
import { timeInterval } from 'rxjs/operator/timeInterval';

let absolute;
let alpha; //z axis / lacet / yaw
let beta; // x axis / tangage / pitch
let gamma; // y axis / roulis / roll

const handleOrientation = (event) => {
    console.log(event)
    alpha = event.alpha
    beta = event.beta
    gamma = event.gamma
}

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


let latitude;
let longitude;
let altitude;
let speed;

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
        data.pitch = beta-90;
        data.yaw = alpha;
        data.roll = -gamma;
        return data;
    })