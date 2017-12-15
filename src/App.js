import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Pfd from './Pfd';
import Rx from 'rxjs/Rx';
import _ from 'lodash';
import gamepadObs from './inputs/Gamepad';
import keyboardObs from './inputs/Keyboard';
import gyroscopeObs from './inputs/Gyroscope';
import registerServiceWorker from './registerServiceWorker';
import InputSelector from './InputSelector';
import './App.css';
import { Observable } from 'rxjs/Observable';

let airspeed = 160;
let overspeed = 170;

export default class App extends React.Component {
    constructor(props) {
        super(props)
        const joystickConnected = navigator.getGamepads()[0] !== null;
        this.state = {
            inputMode: joystickConnected ? 'joystick' : 'gyroscope',
            disabledInputs: joystickConnected ? [] : ['joystick']
        }
        window.addEventListener("gamepadconnected",
            (e) => {
                console.log("Joystick connected")
                this.state.disabledInputs = [];
                this.selectInput('joystick')
            })
        window.addEventListener("gamepaddisconnected",
            () => {
                console.log("Joystick dicsonnected")
                this.state.disabledInputs = ['joystick'];
                this.selectInput('keyboard')
            })
    }

    selectInput(inputMode) {
        this.setState({
            inputMode
        });
    }

    render() {
        console.log("RENDER ")
        let flightDataObs;
        switch (this.state.inputMode) {
            case 'joystick':
                flightDataObs = gamepadObs();
                break;
            case 'keyboard':
                flightDataObs = keyboardObs();
                break;
            case 'gyroscope':
                flightDataObs = gyroscopeObs();
                break;
            default:
                flightDataObs = Observable.of({ airspeed: 250 })
        }
        return <div className="Panel">
            <Pfd className="left" flightDataObs={flightDataObs} />
            <div className="right">
                <div className="input">
                    <label htmlFor="input1">Input source</label>
                    <InputSelector
                        id="input1"
                        choices={["keyboard", "gyroscope", "joystick"]}
                        checked={this.state.inputMode}
                        disabled={this.state.disabledInputs}
                        callback={(c) => this.selectInput(c)}
                    />
                </div>
                {/* <div className="input">
                    <label htmlFor="input1">APU bleed</label>
                    <InputSelector
                        id="input2"
                        choices={["keyboard", "joystick"]}
                        checked={this.state.inputMode}
                        callback={(c) => this.selectInput(c)}
                    />
                </div> */}
            </div>
        </div>;

    }
}