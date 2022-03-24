import React, { useState, useEffect } from "react";
import AdminNav from "./../../../components/navigation/admin-navigation.component";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ProductForm } from "./../../../components/forms/product-form.component";
import { FileUploadForm } from "./../../../components/forms/fileupload-form.component";
import {
  createProducts,
  getOneProduct,
} from "./../../../utils/products/products.utils";

export const ProductUpdate = (props) => {
  const initialValues = {
    title: "",
    description: "",
    price: "",
    category: "",
    categories: [],
    subcategory: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Silver", "White", "Blue", "Dark Grey"],
    brand: "",
    color: "",
  };
  const slug = props.match.params.slug;
  const [values, setValues] = useState(initialValues);
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    await getOneProduct(slug, user.token)
      .then((res) => {
        setValues({ ...res.data });
        console.log(res.data);
        console.log(values);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h3>Products Update Page</h3>
          {/* <h4>{product}</h4> */}
          <div>{/* <FileUploadForm />
            <ProductForm /> */}</div>
        </div>
      </div>
    </div>
  );
};
