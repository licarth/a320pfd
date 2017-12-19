import Rx from 'rxjs/Rx';
import _ from 'lodash';
import { timeInterval } from 'rxjs/operator/timeInterval';

var isPressed = [];
window.onkeyup = function (e) { isPressed[e.key] = false; }
window.onkeydown = function (e) { isPressed[e.key] = true; }

const fps = 50;
const interval = 1000 / fps;
const assignments = {
    "s": { p: "airspeed", inc: 1 },
    "t": { p: "ap.targetSpeed", inc: 1 },
    "o": { p: "overspeed", inc: 1 },
    "a": { p: "altitude", inc: 7 },
    "p": { p: "pitch", inc: 7 },
    "r": { p: "roll", inc: 7 },
}

const data = {
    airspeed: 220,
    altitude: 24000,
    overspeed: 350,
    pitch: 5,
    roll: 0,
    ap: {
        targetSpeed: 140,
    },
    interval,
};

const derivatives = {
    airspeed: 0,
    altitude: 0,
    overspeed: 0,
    pitch: 0,
    roll: 0,
    ap: {
        targetSpeed: 0,
    },
};

Rx.Observable
    .fromEvent(window, 'keydown')
    .map(e => {

        //Which variable ?
        const targetVars = [];

        for (let k of Object.keys(assignments)) {
            if (isPressed[k]) {
                targetVars.push({ p: assignments[k].p, inc: assignments[k].inc });
            }
        }

        switch (e.key) {
            case "ArrowDown":
                _.map(targetVars, ({ p, inc }) =>
                    _.set(derivatives, p, _.get(derivatives, p) - inc)
                );
                console.log(derivatives)
                break;
            case "ArrowUp":
                _.map(targetVars, ({ p, inc }) =>
                    _.set(derivatives, p, _.get(derivatives, p) + inc)
                );
                break;
            case "ArrowLeft":
                // Do something for "left arrow" key press.
                break;
            case "ArrowRight":
                // Do something for "right arrow" key press.
                break;
            case "Enter":
                // Do something for "enter" or "return" key press.
                break;
            case "Escape":
        }
        return data;
    }).subscribe();

export default () => Rx.Observable.interval(interval)
    .timeInterval()
    .map(timeInterval => {
        _.map(_.values(assignments), ({ p, inc }) =>
            _.set(data, p, _.get(data, p) + 0.01 * inc * _.get(derivatives, p))
        )
        return data;
    })