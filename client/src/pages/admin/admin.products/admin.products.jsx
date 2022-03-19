import React, { useState, useEffect } from "react";
import AdminNav from "./../../../components/navigation/admin-navigation.component";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ProductForm } from "./../../../components/forms/product-form.component";
import {
  createProducts,
  getAllProducts,
} from "./../../../utils/products/products.utils";
import {
  getCategories,
  getSubFromCategory,
} from "./../../../utils/category/category.utils";
export const AdminProducts = () => {
  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

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
  const [values, setValues] = useState(initialValues);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const user = useSelector((state) => state.user.currentUser);

  const loadProducts = async () => {
    await getAllProducts()
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };
  const loadCategories = async () => {
    await getCategories().then((res) =>
      setValues({ ...values, categories: res.data })
    );
  };
  const handleChange = (e) => {
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
        loadProducts();
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
          <h3>Products Page</h3>

          <div className="container-fluid">
            {products.map((product) => {
              return (
                <div className="row" key={product._id}>
                  <div className="col border">{product.title}</div>
                </div>
              );
            })}
          </div>

          <br />
          <button
            className="btn btn-primary mb-3"
            onClick={(e) => setNewProduct(true)}
          >
            Create a new product
          </button>

          {newProduct ? (
            <ProductForm
              values={values}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleCatChange={handleCatChange}
              subcategories={subcategories}
              showSubcategories={showSubcategories}
              handleSubChange={handleSubChange}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
