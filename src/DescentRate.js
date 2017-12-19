import React from 'react';
import _ from 'lodash';
import './DescentRate.css';

const formatVerticalSpeed = (int) => {
  let abs = Math.abs(int);
  if (abs >= 100) {
    return Math.floor(abs)
  }

  return ("00" + (abs)).slice(-2)
}

const S = (p) => <g>
  <line
    strokeWidth="2px"
    x1="11"
    y1={p.h}
    x2="19"
    y2={p.h}
    stroke="white"
  />
</g>

const L = (p) => <g>
  <text
    alignment-baseline="middle"
    text-anchor="middle"
    x="5"
    y={p.h}
    fontSize="17"
    fill="white"
  >{p.l}</text>
  <line
    strokeWidth="5px"
    x1="11"
    y1={p.h}
    stroke="white"
    x2="19"
    y2={p.h} />
</g>

const staticGrads = <svg width="48px" height="385px"
  preserveAspectRatio="none">
  <rect x="-3" y="-2" width="22" height="4" fill="yellow" />
  <L l="6" h={180} />
  <S h={160} />
  <L l="2" h={140} />
  <S h={120} />
  <L l="1" h={100} />
  <S h={50} />
  <S h={-50} />
  <L l="1" h={-100} />
  <S h={-120} />
  <L l="2" h={-140} />
  <S h={-160} />
  <L l="6" h={-180} />
</svg>

export default (p) => {
  let rateInPixels;
  const m = p.verticalRateMeters;
  const s = Math.sign(m);
  if (Math.abs(m) <= 10) {
    rateInPixels = - m * 10
  } else if (Math.abs(m) <= 20) {
    rateInPixels = - 60 * s - m * 4
  } else if (Math.abs(m) <= 60) {
    rateInPixels = - 120 * s - m
  } else {
    rateInPixels = - 180 * s
  }
  return <div className="DescentRate">
    {staticGrads}
    <svg>
      <line
        stroke="#3ae061"
        stroke-width="4px"
        background="black"
        x1="15"
        y1={rateInPixels}
        x2="45"
        y2={rateInPixels * 0.4} />
      <g visibility={Math.abs(p.verticalRateMeters) > 1.5 ? "visible" : "hidden"}>
        <rect
          x="18"
          y={rateInPixels - 10 - s * 8}
          width="30"
          height="20"
          fill="black"
        />
        <text
          alignmentBaseline="middle"
          text-anchor="left"
          x="20"
          fill="#3ae061"
          y={rateInPixels - s * 8}
          fontSize="17"
        >{formatVerticalSpeed(Math.floor(p.verticalRateMeters))}</text>
      </g>
    </svg>
  </div>
}
