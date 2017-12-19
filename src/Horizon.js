import React from 'react';
import './Horizon.css';
import _ from 'lodash';

const style = {
  fill: "none",
  stroke: "white",
  strokeWidth: 3,
}
const oneDegreeInPixels = 6.7;

const S = (p) => {
  const pos = - oneDegreeInPixels * p.h;
  return <polyline
    stroke-linecap="round"
    style={style}
    points={`-10,${pos} 10,${pos}`} />
}
const M = (p) => {
  const pos = - oneDegreeInPixels * p.h;
  return <polyline
    stroke-linecap="round"
    style={style}
    points={`-19,${pos} 19,${pos}`} />
}
const L = (p) => {
  const pos = - oneDegreeInPixels * p.h;
  return [
    <text textAnchor="middle" x={-63} y={pos + 5} fill="white">{Math.abs(p.h)}</text>,
    <polyline
      stroke-linecap="round"
      style={style}
      points={`-35,${pos} 35,${pos}`} />,
    <text textAnchor="middle" x={63} y={pos + 5} fill="white">{Math.abs(p.h)}</text>,
  ]
}

const grads = [];
grads.push(<S h={87.5} />)
grads.push(<M h={85} />)
grads.push(<S h={82.5} />)
for (let i = 0; i < 8; i++) {
  grads.push(<L h={i * 10 + 10} />)
  grads.push(<S h={i * 10 + 7.5} />)
  grads.push(<M h={i * 10 + 5} />)
  grads.push(<S h={i * 10 + 2.5} />)
};
grads.push(<S h={-2.5} />)
grads.push(<M h={-5} />)
grads.push(<S h={-7.5} />)
grads.push(<L h={-10} />)
grads.push(<M h={-40 / 3} />)
grads.push(<S h={-50 / 3} />)
for (let i = -9; i < -2; i++) {
  grads.push(<L h={i * 10 + 10} />)
  grads.push(<S h={i * 10 + 7.5} />)
  grads.push(<M h={i * 10 + 5} />)
  grads.push(<S h={i * 10 + 2.5} />)
};

const rectangleHeight = oneDegreeInPixels * 90;
const backgroundSvg = <svg
  overflow="visible">
  <rect x="-500" y={-rectangleHeight} width="1000" height={rectangleHeight} style={{ fill: "#19b5e6" }} />
  <rect x="-500" y="0" width="1000" height={rectangleHeight} style={{ fill: "#64241a" }} />
  {grads}
  <polyline
    style={style}
    points="-200,0 200,0" />
</svg>

const Ruler = (p) => {

  const horizonStyle = {
    transform: `rotate(${-p.roll}deg) translateY(${(p.pitch + p.offset) * oneDegreeInPixels}px)`,
  }
  const flippedHorizonStyle = {
    transform: `scale(1, -1) translateY(${(180) * oneDegreeInPixels}px)`,
  }

  return <div className="centered" style={horizonStyle}>
    <div> {backgroundSvg} </div>
    <div className="flippedText" style={flippedHorizonStyle}>{backgroundSvg}</div>
  </div>
}

const Background = (p) => {

  return <div>
    <Ruler offset={360} {...p} />
    <Ruler offset={0} {...p} />
    <Ruler offset={-360} {...p} />
  </div>
}

const FlightDirectorH = (p) => {
  return <svg className="centered" overflow="visible">
    <polyline points="-75,0 75,0" className="shadow" style={{ fill: "#3ae061", stroke: "#3ae061", strokeWidth: 3 }} />
  </svg>
}
const FlightDirectorV = (p) => {
  return <svg className="centered" overflow="visible">
    <polyline points="0,-75 0,75" className="shadow" style={{ fill: "#3ae061", stroke: "#3ae061", strokeWidth: 3 }} />
  </svg>
}

const fixed = <svg className="centered" overflow="visible">
  <rect
    className="shadow"
    x="-5" y="-5"
    width="10" height="10"
    style={{ fill: "none", stroke: "yellow", strokeWidth: 2 }} />
  <polygon
    stroke-linecap="round"
    className="shadow"
    points="75,-5 133,-5 133,5, 85,5 85,22 75,22"
    style={{ fill: "black", stroke: "yellow", strokeWidth: 2 }} />
  <polygon
    stroke-linecap="round"
    className="shadow"
    points="-75,-5 -133,-5 -133,5, -85,5 -85,22 -75,22"
    style={{ fill: "black", stroke: "yellow", strokeWidth: 2 }} />
</svg>

const Horizon = (p) => {
  return <div className="horizon">
    <Background {..._.pick(p, ['pitch', 'roll'])} />
    <FlightDirectorV {...p} />
    <FlightDirectorH {...p} />
    {fixed}
  </div>
}

export default Horizon;