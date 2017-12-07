import Rx from 'rxjs/Rx';
import _ from 'lodash';
import { timeInterval } from 'rxjs/operator/timeInterval';

var isPressed = [];
window.onkeyup = function (e) { isPressed[e.key] = false; }
window.onkeydown = function (e) { isPressed[e.key] = true; }

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

export default () => Rx.Observable
    .fromEvent(window, 'keydown')
    .map(e => {

        //Which variable ?
        const targetVars = [];

        const assignments = {
            "s": "airspeed",
            "a": "ap.targetSpeed",
            "o": "overspeed",
        }

        for (let k of Object.keys(assignments)) {
            if (isPressed[k]) {
                targetVars.push(assignments[k]);
            }
        }

        switch (e.key) {
            case "ArrowDown":
                _.map(targetVars, targetVar =>
                    _.set(data, targetVar, _.get(data, targetVar) - 1)
                );
                break;
                case "ArrowUp":
                _.map(targetVars, targetVar =>
                    _.set(data, targetVar, _.get(data, targetVar) + 1)
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