import React, { Component } from 'react';
import back from './back.svg';
import horizon from './horizon.svg';
import './Pfd.css';
import Rx from 'rxjs/Rx';

const pad3 = (int) => {
  return ("000" + (int)).slice(-3)
}

const LabelGrid = (p) => {
  return <div className="labelGrid">
    <span style={{gridColumn:"1"}} className="label green">THR CLB</span>
    <span style={{gridColumn:"2"}} className="label green">CLB</span>
    <span style={{gridColumn:"5", gridLine:"1"}} className="label">AA2</span>
    <span style={{gridColumn:"5", gridLine:"2"}} className="label">1 FF 2</span>
    <span style={{gridColumn:"5", gridLine:"3"}} className="label">A/THR</span>
  </div>
}

const AirspeedIndicator = (p) => {

  const speedStyle = {
    position: "absolute",
    zIndex: 10,
    color: "white",
    top: "152.4px",
    left: "25.5px",
    height: "319.8px",
    width: "65.5px",
    overflow: "hidden",
    margin: "0px",
  }

  let speedMarks = [];
  let offset = 153;
  let dispAirspeed = Math.max(p.airspeed, 30)
  for (let i = -10; i < 11; i++) {
    let oneKtInPx = 3.808;
    let speedMark = Math.floor(dispAirspeed / 10) * 10 - i * 10;
    if (speedMark >= 30) {

      const markStyle = {
        bottom: `${offset + oneKtInPx * (speedMark - dispAirspeed)}px`,
      }
      speedMarks.push(
        <div className="SpeedLabel" style={markStyle}>
          <span className="SpeedNumber">{!(speedMark / 10 % 2) ? pad3(speedMark) : ""}</span>
          <span>
            <svg width="1em" height="1em" viewBox="0 0 1 1" preserveAspectRatio="none" class="baseline">
              <line x1="0" y1="0.97" x2="1" y2="0.97" />
            </svg>
          </span>
        </div>
      );
    }
  }

  return <div className="AirspeedIndicator" style={speedStyle}>
    {speedMarks}
  </div>
}

class Pfd extends Component {

  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.state = { airspeed: 0 }
    // let airspeed = 0;
    props.flightDataObs.subscribe(data => {
      this.update(data);
    })
  }

  render() {

    const backgroundStyle = {
      position: "absolute",
      zIndex: -1
    }
    const horizonStyle = {
      position: "absolute",
      zIndex: -10,
      top: "Opx",
    }
    return (
      <div className="Pfd">
        <LabelGrid />
        <img src={back} className="background" style={backgroundStyle} />
        <AirspeedIndicator airspeed={this.state.airspeed} />
        <img src={horizon} className="horizon" style={horizonStyle} />
      </div>
    );
  }

  update(data) {
    // console.log(this.state)
    this.setState({ airspeed: data.airspeed });
  }

}
export default Pfd;
