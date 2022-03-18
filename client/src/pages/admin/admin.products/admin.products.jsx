import React, { useState, useEffect } from "react";
import AdminNav from "./../../../components/navigation/admin-navigation.component";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
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
  const {
    title,
    description,
    price,
    category,
    categories,
    subcategory,
    shipping,
    quantity,
    images,
    colors,
    brand,
    color,
  } = values;
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
            <form onSubmit={handleSubmit}>
              <div className="form-froup">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-froup">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  value={description}
                  onChange={handleChange}
                />
              </div>
              <div className="form-froup">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={price}
                  onChange={handleChange}
                />
              </div>
              <div className="form-froup">
                <label>Shipping</label>
                <select
                  name="shipping"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>shipping?</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div className="form-froup">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  value={quantity}
                  onChange={handleChange}
                />
              </div>
              <div className="form-froup">
                <label>Colors</label>
                <select
                  name="color"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>please select color</option>
                  {colors.map((cl) => (
                    <option value={cl} key={cl}>
                      {cl}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-froup">
                <label>Brand</label>
                <input
                  type="text"
                  name="brand"
                  className="form-control"
                  value={brand}
                  onChange={handleChange}
                />
              </div>
              <br />
              <button className="btn btn-primary" onClick={handleSubmit}>
                Save
              </button>
            </form>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
