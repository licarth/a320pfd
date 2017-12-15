import Rx from 'rxjs/Rx';
import _ from 'lodash';
import { timeInterval } from 'rxjs/operator/timeInterval';

var isPressed = [];
window.onkeyup = function (e) { isPressed[e.key] = false; }
window.onkeydown = function (e) { isPressed[e.key] = true; }

const data = {
    airspeed: 250,
    altitude: 4000,
    overspeed: 200,
    pitch: 10,
    ap: {
        targetSpeed: 140,
    }
};

const fps = 30;
const interval = 1000 / fps;

export default () => Rx.Observable
    .fromEvent(window, 'keydown')
    .map(e => {

        //Which variable ?
        const targetVars = [];

        const assignments = {
            "s": {p: "airspeed", inc:1},
            "t": {p: "ap.targetSpeed", inc:1},
            "o": {p: "overspeed", inc:1},
            "a": {p: "altitude", inc: 7},
        }

        for (let k of Object.keys(assignments)) {
            if (isPressed[k]) {
                targetVars.push({p: assignments[k].p, inc:assignments[k].inc});
            }
        }

        switch (e.key) {
            case "ArrowDown":
                _.map(targetVars, ({p, inc}) =>
                    _.set(data, p, _.get(data, p) - inc)
                );
                break;
                case "ArrowUp":
                _.map(targetVars, ({p, inc}) =>
                    _.set(data, p, _.get(data, p) + inc)
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
    });