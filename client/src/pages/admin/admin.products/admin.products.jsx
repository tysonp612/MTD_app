import React, { useState, useEffect } from "react";
import AdminNav from "./../../../components/navigation/admin-navigation.component";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ProductForm } from "./../../../components/forms/product-form.component";
import {
  createProducts,
  getAllProducts,
} from "./../../../utils/products/products.utils";
export const AdminProducts = () => {
  useEffect(() => {
    loadProducts();
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

  const user = useSelector((state) => state.user.currentUser);

  const loadProducts = async () => {
    await getAllProducts()
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
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
                <div className="row">
                  <div className="col border" key={product._id}>
                    {product.title}
                  </div>
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
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
