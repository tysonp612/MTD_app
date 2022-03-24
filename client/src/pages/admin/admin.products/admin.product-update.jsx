import React, { useState, useEffect } from "react";
import AdminNav from "./../../../components/navigation/admin-navigation.component";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ProductForm } from "./../../../components/forms/product-form.component";
import { FileUploadForm } from "./../../../components/forms/fileupload-form.component";
import { createProducts } from "./../../../utils/products/products.utils";

export const ProductUpdate = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h3>Products Update Page</h3>
          {JSON.stringify(props.match.params.slug)}
          <div>{/* <FileUploadForm />
            <ProductForm /> */}</div>
        </div>
      </div>
    </div>
  );
};
