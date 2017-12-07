import React, { Component } from 'react';
import back from './back.svg';
import './Pfd.css';
import AirspeedIndicator from './Airspeed';
import Altimeter from './Altimeter';
import Horizon from './Horizon';
import _ from 'lodash';

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
      ap: {
        targetSpeed: undefined,
      }
    }
    this.state.dataSubscription = props.flightDataObs.subscribe(data => {
      this.update(data);
    })
  }

  componentWillReceiveProps(nextprops) {
    if (this.state.dataSubscription) {
      this.state.dataSubscription.unsubscribe();
    };
    this.state.dataSubscription = nextprops.flightDataObs.subscribe(data => {
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
        <AirspeedIndicator {...this.state} />
        <Altimeter {...this.state} />
      </div>
    );
  }

  update(data) {
    this.setState(_.merge(this.state, data));
  }

}
export default Pfd;
