import React, { Component } from 'react';
import back from './back.svg';
import horizon from './horizon.svg';
import './Pfd.css';
import Rx from 'rxjs/Rx';


const AirspeedIndicator = (props) => {

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
  
  const markStyle = {
    position: "relative",
    zIndex: 10,
    color: "white",
    float: "right",
    bottom: `${props.airspeed}%`,
    // bottom: "461px",
    
    // top: "461px",
    // left: "84px",
  }
  
  return <div className="AirspeedIndicator" style={speedStyle}>
    <div style={markStyle}>330 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>320 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>310 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>300 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>290 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>280 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>270 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>260 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>250 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>240 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>130 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>220 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>210 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>200 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>190 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>180 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>170 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>160 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>150 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>140 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>130 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>120 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>110 -</div><br/>
    <div style={markStyle}>-</div><br/>
    <div style={markStyle}>100 -</div><br/>
  </div>
}

class Pfd extends Component {
  
  constructor(props) {
    super();
    this.update = this.update.bind(this);
    this.state = {airspeed: 0}
    let airspeed = 0;
    Rx.Observable.interval(15)
    .timeInterval()
    // .take(100)
    .subscribe(t => {
      airspeed++;
      this.update({airspeed: airspeed/10 % 70});
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
    console.log(this.state)
    this.setState({airspeed: data.airspeed});
  }

}
export default Pfd;
