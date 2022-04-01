import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getOneProduct,
  getRelatedProducts,
} from "./../../utils/products/products.utils";
import { SingleProduct } from "./../../components/card/single-product-card.component";
import { updateStarRating } from "./../../utils/products/products.utils";
export const ProductPage = ({ match }) => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [star, setStar] = useState();
  const { slug } = match.params;
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    loadProduct();
  }, [slug]);
  //Note this
  useEffect(() => {
    loadRelatedProduct();
  }, [product]);
  const loadProduct = async () => {
    await getOneProduct(slug)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  };
  const loadRelatedProduct = async () => {
    if (product && product.category) {
      await getRelatedProducts(slug, product.category._id)
        .then((res) => {
          setRelatedProducts(res.data);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleStarRating = async (e) => {
    setStar(e);
    await updateStarRating(product._id, user.token, e)
      .then()
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          star={star}
          handleStarRating={handleStarRating}
          product={product}
        />
      </div>
      <div className="row mt-5 text-center">
        {relatedProducts.map((relatedProduct) => {
          return <div key={relatedProduct._id}>{relatedProduct.title}</div>;
        })}
      </div>
    </div>
  );
};
