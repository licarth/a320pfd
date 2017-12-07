import React from 'react';
import _ from 'lodash';
import './Altimeter.css';

const digits = _.map(
  [9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
  i => <div>{i}</div>
);

const twoLast = _.map(
  ["80", "00", "20", "40", "60", "80", "00", "20"],
  i => <div>{i}</div>
);

const Altimeter = (p) => {

  return <div className="Altimeter">
    <div className="BigDigitsContainer">
      {/* <div className="BigDigits"> */}
      {/* <div className="FirstDigit bigDigit">{digits}</div> */}
      <div className="SecondDigit bigDigit">{digits}</div>
      <div className="ThirdDigit bigDigit">{digits}</div>
      {/* </div> */}
    </div>
    <div className="SmallDigitsContainer">
      <div className="TwoLast smallDigit">{twoLast}</div>
    </div>
  </div>
}

export default Altimeter;