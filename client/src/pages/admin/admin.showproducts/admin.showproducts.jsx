import React, { useEffect, useState } from "react";
import AdminNav from "./../../../components/navigation/admin-navigation.component";
import AdminProductCard from "../../../components/card/admin.product-card.component";
import { getAllProductsByCount } from "./../../../utils/products/products.utils";

export const AdminShowProduct = () => {
  const [products, setProducts] = useState([]);
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
                  <AdminProductCard product={product} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
