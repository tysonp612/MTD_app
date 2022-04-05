import React, { useState } from "react";
import { Slider } from "antd";

export const SliderComponent = ({ input, renderProductFromSlider }) => {
  const { min, max, defaultValue } = input;
  const [value, setValue] = useState([]);

  const handleChangeValue = (e) => {
    setValue(e);
    renderProductFromSlider(e);
  };

  return (
    <>
      <Slider
        range
        defaultValue={defaultValue}
        min={min}
        max={max}
        onChange={(e) => {
          handleChangeValue(e);
        }}
      />
    </>
  );
};
