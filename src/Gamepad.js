import Rx from 'rxjs/Rx';
import _ from 'lodash';
import { timeInterval } from 'rxjs/operator/timeInterval';


const cloneObject = (orig) => {
    return Object.assign(Object.create(Object.getPrototypeOf(orig)), orig);
}

const cloneGamepad = (g) => {
    const gc = {};
    gc.axes = _.clone(g.axes);
    gc.buttons = _.map(g.buttons, b => {
        const bc = {};
        bc.pressed = b.pressed
        return bc;
    })
    gc.timestamp = g.timestamp;

    return gc;
}


class Joystick {
    constructor() {
        this.curr = navigator.getGamepads()[0];
    }

    refresh() {
        if (this.curr) {
            this.prev = cloneGamepad(this.curr);
        } 
        // else {
            // this.prev = g;
        // }
        const g = navigator.getGamepads()[0];
        this.curr = g;
        this.buttons = g.buttons;
        this.axes = g.axes;
        return this;
    }

    connected() {
        return this.curr !== undefined;
    }

    buttonPressed(buttonNumber) {
        return this.curr.buttons[buttonNumber].pressed && !this.prev.buttons[buttonNumber].pressed
    }
    
    buttonReleased(buttonNumber) {
        return this.prev && !this.curr.buttons[buttonNumber].pressed && this.prev.buttons[buttonNumber].pressed
    }
    
}

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

const j = new Joystick();

export default () => Rx.Observable.interval(interval)
.timeInterval()
.map(timeInterval => {
    if (j.connected()) {
        j.refresh();
        data.airspeed = Math.max(0, data.airspeed - Math.pow(j.axes[2], 3) * interval);
        data.overspeed = 150 + (j.axes[4] + 1) * 50;
        if (j.buttonReleased(8)) {
                data.ap.targetSpeed++;
            }
            if (j.buttonReleased(9)) {
                data.ap.targetSpeed--;
            }
            if (j.buttonReleased(10)) {
                data.ap.targetSpeed += 10;
            }
            if (j.buttonReleased(11)) {
                data.ap.targetSpeed -= 10;
            }
            return data;
        } else {
            return;
        }
    })