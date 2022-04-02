import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export const CategoriesPage = () => {
  const [products, setProducts] = useState([]);
  const { slug } = useParams();

  return <div>{slug}</div>;
};
