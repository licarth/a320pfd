import React from 'react';
import SpeedTriangle from './speed-triangle.svg'
import './Airspeed.css'

const pad3 = (int) => {
  return ("000" + (int)).slice(-3)
}
let oneKtInPx = 3.808;

let speedMarks = [];
for (let i = 3; i < 100; i++) {
  let speedMark = i * 10;

  const markStyle = {
    bottom: `${oneKtInPx * speedMark}px`,
  }

  speedMarks.push(
    <div key={speedMark} className="SpeedLabel" style={markStyle}>
      <span className="SpeedNumber">{!(speedMark / 10 % 2) ? pad3(speedMark) : ""}</span>
      <svg width="14px" height="1.5px" viewBox="0 0 1 1" preserveAspectRatio="none" className="baseline">
        <line x1="0" y1="0.5" x2="1" y2="0.5" />
      </svg>
    </div>
  );
}

const AirspeedIndicator = (p) => {

  let dispAirspeed = Math.max(p.airspeed, 30)

  let offset = -160;
  const rulerStyle = {
    bottom: `${offset - oneKtInPx * dispAirspeed}px`,
  }

  const overspeedStyle = {};
  if (p.overspeed && p.overspeed < dispAirspeed + 41) {
    overspeedStyle.bottom = `${oneKtInPx * (p.overspeed - dispAirspeed) - offset}px`
  } else {
    overspeedStyle.bottom = "1000px"
  }

  const belowLineStyle = {}
  if (dispAirspeed < 72) {
    belowLineStyle.display = "none";
  }

  const apTriangle = {
    position: "absolute",
    bottom: `${oneKtInPx * (p.ap.targetSpeed - dispAirspeed) - offset - 17}px`,
    left: "-5px",
  }

  let apAirspeedDigitsStyle = {};
  if (p.ap.targetSpeed < dispAirspeed - 41) {
    delete apAirspeedDigitsStyle.hidden;
  } else {
    apAirspeedDigitsStyle.display = "none";
  }

  return <div className="AirspeedIndicator">
    <div className="SpeedContainer">
      <div className="ZeroSpeed" style={rulerStyle}>
        <svg className="VerticalLine" width="1px" height="10px" viewBox="0 0 1 1" preserveAspectRatio="none">
          <line x1="0.5" y1="0" x2="0.5" y2="1" />
        </svg>
        {speedMarks}
      </div>
    </div>
    <div className="RightMarks">
      <svg style={overspeedStyle} className="Overspeed" viewBox="0 0 10 1000" preserveAspectRatio="none">
        <line strokeDasharray="9, 9" x1="5" y1="0" x2="5" y2="1000" />
      </svg>
      <div style={apTriangle}>
        <img src={SpeedTriangle} className="speedTriangle" alt="speedTriangle" />
      </div>
    </div>
    <svg style={belowLineStyle} className="SpeedBottomLine" width="10px" height="1px" viewBox="0 0 1 1" preserveAspectRatio="none">
      <line x1="0" y1="0.5" x2="1" y2="0.5" />
    </svg>
    <div className="ApAirspeedDigitsBottom" style={apAirspeedDigitsStyle}>{Math.floor(p.ap.targetSpeed)}</div>
  </div>
}

export default AirspeedIndicator;