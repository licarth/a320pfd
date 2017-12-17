import React from 'react';
import './Horizon.css';

const style = {
  fill: "none",
  stroke: "white",
  strokeWidth: 3,
}
const oneDegreeInPixels = 6.7;

const S = (p) => {
  const pos = - oneDegreeInPixels * p.h;
  return <polyline
    style={style}
    points={`-10,${pos} 10,${pos}`} />
}
const M = (p) => {
  const pos = - oneDegreeInPixels * p.h;
  return <polyline
    style={style}
    points={`-19,${pos} 19,${pos}`} />
}
const L = (p) => {
  const pos = - oneDegreeInPixels * p.h;
  return [
    <text textAnchor="middle" x={-63} y={pos + 5} fill="white">{Math.abs(p.h)}</text>,
    <polyline
      style={style}
      points={`-35,${pos} 35,${pos}`} />,
    <text textAnchor="middle" x={63} y={pos + 5} fill="white">{Math.abs(p.h)}</text>,
  ]
}

const Horizon = (p) => {

  const horizonStyle = {
    transform: `rotate(${p.roll}deg) translateY(${p.pitch* oneDegreeInPixels}px)`,
    // transform: `translateY(${24}px)`,
  }

  const red = {
    fill: "none",
    stroke: "red",
    strokeWidth: 3,
  }

  return <div className="horizon">
    <div className="centered" style={horizonStyle}>
      <svg
        overflow="visible">
        <rect x="-500" y="-1000" width="1000" height="1000" style={{ fill: "#19b5e6" }} />
        <rect x="-500" y="0" width="1000" height="1000" style={{ fill: "#64241a" }} />
        <L h={30} />
        <S h={27.5} />
        <M h={25} />
        <S h={22.5} />
        <L h={20} />
        <S h={17.5} />
        <M h={15} />
        <S h={12.5} />
        <L h={10} />
        <S h={7.5} />
        <M h={5} />
        <S h={2.5} />
        <polyline
          style={style}
          points="-200,0 200,0" />
        <S h={-2.5} />
        <M h={-5} />
        <S h={-7.5} />
        <L h={-10} />
        <M h={-40 / 3} />
        <S h={-50 / 3} />
        <L h={-20} />
      </svg>
    </div>
    <svg className="centered"
      overflow="visible"
    >
      <rect className="shadow" x="-5" y="-5" width="10" height="10" style={{ fill: "none", stroke: "yellow", strokeWidth: 2 }} />
      <polygon className="shadow" points="75,-5 133,-5 133,5, 85,5 85,22 75,22" style={{ fill: "black", stroke: "yellow", strokeWidth: 2 }} />
      <polygon className="shadow" points="-75,-5 -133,-5 -133,5, -85,5 -85,22 -75,22" style={{ fill: "black", stroke: "yellow", strokeWidth: 2}} />
    </svg>
  </div>
}

export default Horizon;