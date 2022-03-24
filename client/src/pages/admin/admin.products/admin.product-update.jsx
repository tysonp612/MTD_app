import React, { useState, useEffect } from "react";
import AdminNav from "./../../../components/navigation/admin-navigation.component";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ProductForm } from "./../../../components/forms/product-form.component";
import { FileUploadForm } from "./../../../components/forms/fileupload-form.component";
import { createProducts } from "./../../../utils/products/products.utils";

export const ProductUpdate = () => {
  return <h1>PRODUCT UPDATE</h1>;
};
