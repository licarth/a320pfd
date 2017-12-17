import React from 'react';
import SpeedTriangle from './speed-triangle.svg'
import './AltitudeRoll.css'

const pad3 = (int) => {
  return ("000" + (int)).slice(-3)
}
let oneLfInPx = 28.5;

let speedMarks = [];
for (let i = 0; i < 600; i++) {
  let flMark = i;

  const markStyle = {
    bottom: `${oneLfInPx * flMark}px`,
  }

  speedMarks.push(
    <div key={flMark} className="SpeedLabel" style={markStyle}>
      <span className="SpeedNumber">{!(flMark % 5) ? ">"+pad3(flMark) : ""}</span>
      <svg width="9px" height="1.5px" viewBox="0 0 1 1" preserveAspectRatio="none" className="baseline">
        <line x1="0" y1="0.5" x2="1" y2="0.5" />
      </svg>
    </div>
  );
}

const AltitudeRoll = (p) => {

  let dispFL = p.altitude / 100

  let offset = -163;
  const rulerStyle = {
    bottom: `${offset - oneLfInPx * dispFL}px`,
  }

  const belowLineStyle = {}
  if (dispFL < 72) {
    belowLineStyle.display = "none";
  }

  return <div className="AltitudeRoll">
    <div className="SpeedContainer">
      <div className="ZeroSpeed" style={rulerStyle}>
        <svg className="VerticalLine" width="1px" height="10px" viewBox="0 0 1 1" preserveAspectRatio="none">
          <line x1="0.5" y1="0" x2="0.5" y2="1" />
        </svg>
        {speedMarks}
      </div>
    </div>
    <svg style={belowLineStyle} className="SpeedBottomLine" width="10px" height="1px" viewBox="0 0 1 1" preserveAspectRatio="none">
      <line x1="0" y1="0.5" x2="1" y2="0.5" />
    </svg>
  </div>
}

export default AltitudeRoll;