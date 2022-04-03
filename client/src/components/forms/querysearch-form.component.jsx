import React, { useState } from "react";

export const QuerySearchForm = () => {
  const [query, setQuery] = useState("");
  const handleInput = (e) => {
    setQuery(e.target.value);
    console.log(test);
  };
  const handleChange = (e) => {
    e.preventDefault();
    console.log(query);
  };
  return (
    <form onSubmit={(e) => handleChange(e)}>
      <input
        placeholder="Search product"
        className="form-control"
        type="text"
        onChange={(e) => handleInput(e)}
      ></input>
    </form>
  );
};
