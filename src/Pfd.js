import React, { Component } from 'react';
import back from './back.svg';
import './Pfd.css';
import AirspeedIndicator from './Airspeed';
import Altimeter from './Altimeter';
import Horizon from './Horizon';
import _ from 'lodash';
import calque from './calque.svg';

const LabelGrid = (p) => {
  return <div className="labelGrid">
    <span style={{ gridColumn: "1" }} className="label green">THR CLB</span>
    <span style={{ gridColumn: "2" }} className="label green">CLB</span>
    <span style={{ gridColumn: "5", gridLine: "1" }} className="label">AA2</span>
    <span style={{ gridColumn: "5", gridLine: "2" }} className="label">1 FF 2</span>
    <span style={{ gridColumn: "5", gridLine: "3" }} className="label">A/THR</span>
  </div>
}

class Pfd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airspeed: 310.5,
      altitude: 21020,
      pitch: 4.1,
      roll: 0,
      yaw: 0,
      ap: {
        targetSpeed: 311.5,
      }
    }
    this.dataSubscription = props.flightDataObs.subscribe(data => {
      this.setState(data);
    })
  }

  componentWillReceiveProps(nextprops) {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    };
    this.dataSubscription = nextprops.flightDataObs.subscribe(data => {
      this.setState(data);
    })
  }


  render() {
    const backgroundStyle = {
      position: "absolute",
      zIndex: -1
    }
    return (
      <div className="Pfd">
        <LabelGrid />
        <img src={back} className="background" style={backgroundStyle} alt="" />
        <Horizon {...this.state} />
        <AirspeedIndicator {...this.state} />
        <Altimeter {...this.state} />
        {/* <img className="Calque" src={calque} /> */}
      </div>
    );
  }

}
export default Pfd;
