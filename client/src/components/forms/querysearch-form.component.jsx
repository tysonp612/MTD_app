import React from "react";
import { SearchQueryActionTypes } from "./../../redux/reducers/search-query/search-query.types";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
export const QuerySearchForm = () => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.query.query);
  const history = useHistory();
  const handleInput = (e) => {
    dispatch({
      type: SearchQueryActionTypes.SEARCH_QUERY,
      payload: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${query}`);
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        placeholder="Search product"
        className="form-control"
        type="text"
        onChange={(e) => handleInput(e)}
      ></input>
    </form>
  );
};
