import React from 'react';
import horizon from './horizon.svg';

const Horizon = (p) => {

  const horizonStyle = {
    position: "absolute",
    zIndex: -10,
    top: "Opx",
  }
  return <img src={horizon} className="horizon" style={horizonStyle} alt="horizon" />

}

export default Horizon;