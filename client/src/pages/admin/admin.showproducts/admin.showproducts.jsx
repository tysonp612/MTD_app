import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminNav from "./../../../components/navigation/admin-navigation.component";
import AdminProductCard from "../../../components/card/admin.product-card.component";
import {
  getAllProductsByCount,
  deleteProduct,
} from "./../../../utils/products/products.utils";
import slugify from "slugify";

export const AdminShowProduct = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    await getAllProductsByCount(10)
      .then((res) => {
        setProducts(res.data);
        console.log(products);
      })
      .catch((err) => console.log(err));
  };
  const handleProductDelete = async (title) => {
    const slug = slugify(title).toLocaleLowerCase();
    await deleteProduct(slug, user.token)
      .then(() => loadProducts())
      .catch((err) => console.log(err));
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <div className="row">
            {products.map((product) => {
              return (
                <div className="col-md-4 pb-3" key={product._id}>
                  <AdminProductCard
                    product={product}
                    handleProductDelete={handleProductDelete}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
