import React, { useState, useEffect } from "react";
import AdminNav from "./../../../components/navigation/admin-navigation.component";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ProductUpdateForm } from "./../../../components/forms/product-update-form.component";
import { FileUploadForm } from "./../../../components/forms/fileupload-form.component";
import {
  createProducts,
  getOneProduct,
} from "./../../../utils/products/products.utils";
import {
  getCategories,
  getSubFromCategory,
} from "./../../../utils/category/category.utils";

export const ProductUpdate = (props) => {
  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);
  const initialValues = {
    title: "",
    description: "",
    price: "",
    category: "",
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
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const user = useSelector((state) => state.user.currentUser);

  const loadProduct = async () => {
    await getOneProduct(slug, user.token)
      .then((res) => {
        setValues({ ...values, ...res.data });
      })
      .catch((err) => console.log(err));
  };
  const loadCategories = async () => {
    await getCategories().then((res) => {
      setCategories(res.data);
    });
  };
  const handleChange = (e) => {
    console.log(categories);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCatChange = async (e) => {
    setValues({ ...values, category: e.target.value });
    await getSubFromCategory(e.target.value)
      .then((res) => {
        setSubcategories(res.data);

        res.data.length > 0
          ? setShowSubcategories(true)
          : setShowSubcategories(false);
      })
      .catch((err) => console.log(err));
  };
  const handleSubChange = (e) => {
    setValues({ ...values, subcategory: e });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await createProducts(values, user.token)
      .then((res) => {
        toast.success("Product created successfully");
        setValues(initialValues);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Product created failed");
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h3>Products Update Page</h3>
          <ProductUpdateForm
            values={values}
            handleChange={handleChange}
            categories={categories}
            handleSubmit={handleSubmit}
            handleCatChange={handleCatChange}
            subcategories={subcategories}
            showSubcategories={showSubcategories}
            handleSubChange={handleSubChange}
          />
        </div>
      </div>
    </div>
  );
};
