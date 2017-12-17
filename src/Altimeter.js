import React from 'react';
import _ from 'lodash';
import './Altimeter.css';
import AltitudeRoll from './AltitudeRoll'

const digits = _.map(
  [1, 0, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  i => <div>{i}</div>
);

const twoLast = _.map(
  ["20", "00", "80", "60", "40", "20", "00", "80"],
  i => <div>{i}</div>
);


const BigDigit = (p) => {
  const digitStyle = {
    top: `${p.value}em`
  }
  return <div className="Digit" style={digitStyle}>{digits}</div>;
}

const Altimeter = (p) => {

  let firstDigitValue = Math.floor(p.altitude / 10000);
  let secondDigitValue = Math.floor((p.altitude - firstDigitValue * 10000) / 1000);
  let thirdDigitValue = Math.floor((p.altitude - firstDigitValue * 10000 - secondDigitValue * 1000) / 100);
  let twoLastValue = p.altitude % 100;
  let offset;

  if (p.altitude % 100 > 80) {
    offset = p.altitude % 20 / 20
    thirdDigitValue += offset;
    if (p.altitude % 1000 > 980) {
      secondDigitValue += offset;
    }
    if (p.altitude % 10000 > 9980) {
      firstDigitValue += offset;
    }
  }

  return <div className="Altimeter">
    <div class="DigitsContainer">
      <AltitudeRoll {...p} />
      <div className="BigDigitsContainer">
        <BigDigit value={firstDigitValue} />
        <BigDigit value={secondDigitValue} />
        <BigDigit value={thirdDigitValue} />
      </div>
      <div className="SmallDigitsContainer">
        <div className="TwoLast Digit" style={{ top: `${twoLastValue / 20}em` }}>{twoLast}</div>
      </div>
    </div>
  </div>
}

export default Altimeter;