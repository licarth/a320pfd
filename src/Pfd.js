import React, { Component } from 'react';
import back from './back.svg';
import './Pfd.css';
import AirspeedIndicator from './Airspeed';
import Altimeter from './Altimeter';
import Horizon from './Horizon';

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
    this.update = this.update.bind(this);
    this.state = {
      airspeed: 0,
      altitude: 0,
    }

    props.flightDataObs.subscribe(data => {
      this.update(data);
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
        <Horizon />
        <AirspeedIndicator airspeed={this.state.airspeed} overspeed={this.state.overspeed} />
        <Altimeter altitude={this.state.altitude} />
      </div>
    );
  }

  update(data) {
    // console.log(this.state)
    this.setState({
      airspeed: data.airspeed,
      overspeed: data.overspeed
    });
  }

}
export default Pfd;
