import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export const CategoryPage = () => {
  const slug = useParams();
  return <div>{slug}</div>;
};
