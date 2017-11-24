import React, { Component } from 'react';
import back from './back.svg';
import horizon from './horizon.svg';
import './Pfd.css';
import Rx from 'rxjs/Rx';

const pad3 = (int) => {
  return ("000" + (int)).slice(-3)
}

const AirspeedIndicator = (p) => {

  const speedStyle = {
    position: "absolute",
    zIndex: 10,
    color: "white",
    // top: "143px",
    // bottom: "461px",
    boxSizing: "border-box",
    top: "152.4px",
    left: "25.5px",
    height: "319.8px",
    width: "65.5px",
    // border: "solid",
    // borderColor: "green",
    overflow: "hidden",
    margin: "0px",
    // display: "inline-block",
  }

  let speedMarks = [];
  let offset = 140;
  let dispAirspeed = Math.max(p.airspeed, 30)
  for (let i = -10; i < 11; i++) {
    let oneKtInPx = 3.808;
    let speedMark = Math.floor(dispAirspeed / 10) * 10 - i * 10;
    if (speedMark >= 30) {

      const markStyle = {
        bottom: `${offset + oneKtInPx * (speedMark - dispAirspeed)}px`,
      }
      speedMarks.push(<div className="SpeedMark" style={markStyle}>{!(speedMark / 10 % 2) ? pad3(speedMark) : ""}  -</div>);
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
      zIndex: 10
    }
    const horizonStyle = {
      position: "absolute",
      zIndex: 1,
      top: "Opx",
    }
    return (
      <div className="Pfd">
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
