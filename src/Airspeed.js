import React from 'react';

const pad3 = (int) => {
  return ("000" + (int)).slice(-3)
}
// let oneKtInPx = 3.808;
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
      {/* <span> */}
        <svg width="10px" height="3px" viewBox="0 0 1 1" preserveAspectRatio="none" className="baseline">
          <line x1="0" y1="0.5" x2="1" y2="0.5" />
        </svg>
      {/* </span> */}
    </div>
  );
}

const AirspeedIndicator = (p) => {
  
  let dispAirspeed = Math.max(p.airspeed, 30)
  
  let offset = -160;
  const rulerStyle = {
    bottom: `${offset - oneKtInPx * dispAirspeed}px`,
  }

  return <div className="AirspeedIndicator">
    <div className="ZeroSpeed" style={rulerStyle}>
      {speedMarks}
    </div>
  </div>
}

export default AirspeedIndicator;