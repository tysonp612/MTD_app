import React, { useState } from "react";
import { Slider } from "antd";

export const SliderComponent = ({ input }) => {
  const { min, max, defaultValue } = input;
  const [value, setValue] = useState([]);

  const handleChangeValue = (e) => {
    setValue(e);
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
          console.log(value);
        }}
      />
    </>
  );
};
