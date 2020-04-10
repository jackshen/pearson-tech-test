import React from "react";
import styled from "styled-components";

import { createScaleFunction, EXPONENTIAL_DOMAIN } from "./_createScaleFunction";

const OFFSET_AMOUNT = 0.5;
const SCALE_DEC_PLACES = 1;

const ControlPanelWrapper = styled.div`
  align-items: center;
  bottom: 3rem;
  display: flex;
  flex-direction: row;
  left: 50%;
  position: absolute;
  transform: translate(-50%, 0);
  width: max-content;
`;

const InputNumber = styled.input`
  border: 0.0625rem solid black;
  padding: 0.2rem 0.5rem;
  margin: 0 1rem;
`;

const thumbStyles = `
  appearance: none;
  background: rgb(217, 217, 217);
  border: 0.0625rem solid black;
  border-radius: 50%;
  cursor: pointer;
  height: 1rem;
  width: 1rem;
`;

const InputSlider = styled.input.attrs({ type: "range" })`
  appearance: none;
  height: 0.0625rem;
  background: black;
  width: 10rem;

  /* if we don't separate the two, it doesn't work */
  ::-webkit-slider-thumb {
    ${thumbStyles}
  }

  ::-moz-range-thumb {
    ${thumbStyles}
  }
`;

const scale = createScaleFunction(OFFSET_AMOUNT);

const ControlPanel = ({ onChange: pushChange, max, min, numSteps, value }) => {
  const halfInterval = (max - min) / 2;

  const handleChangeNumber = evt => {
    const xValue = Math.min(max, Math.max(min, Number(evt.target.value)));
    pushChange(xValue);
  };

  const handleChangeSlider = evt => {
    const yValue = evt.target.value;
    const xValue = scale.x(yValue) * halfInterval;
    pushChange(xValue);
  };

  const exponentialDomainRange = EXPONENTIAL_DOMAIN.max - EXPONENTIAL_DOMAIN.min;
  const valueRange = max - min;
  // value used in the inputSlider, a representation of value's relativity to min/max, but constrained between -1 and 1 (exponentialDomainRange)
  const inputSliderValue = EXPONENTIAL_DOMAIN.min + (exponentialDomainRange * (value - min)) / valueRange;

  return (
    <ControlPanelWrapper>
      {/* I purposely refrain from using htmlFor with an id, because the use of a static ID within a component makes multiple copies of the component semantically incorrect */}
      {/* I'm aware that there are ways around this issue; however, I have opted to simply nest the input within the label instead, maintaining both accessibility and semantics */}
      <label>
        Velocity (km/s)
        <InputNumber max={max} min={min} onChange={handleChangeNumber} type="number" value={value} />
      </label>
      <InputSlider
        data-testid="input-slider"
        onChange={handleChangeSlider}
        max={EXPONENTIAL_DOMAIN.max}
        min={EXPONENTIAL_DOMAIN.min}
        step={(EXPONENTIAL_DOMAIN.max - EXPONENTIAL_DOMAIN.min) / numSteps}
        value={scale.y(inputSliderValue)}
      />
    </ControlPanelWrapper>
  );
};

export default ControlPanel;
