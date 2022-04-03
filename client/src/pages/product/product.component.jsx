import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getOneProduct,
  getRelatedProducts,
  relatedProductsCount,
} from "./../../utils/products/products.utils";
import { SingleProduct } from "./../../components/card/single-product-card.component";
import { ProductCard } from "./../../components/card/regular.product-card.component";
import { updateStarRating } from "./../../utils/products/products.utils";
import { Pagination } from "antd";
export const ProductPage = ({ match }) => {
  const [product, setProduct] = useState({});
  const [page, setPage] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productsQuantity, setProductsQuantity] = useState(0);
  const [star, setStar] = useState();
  const { slug } = match.params;
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    loadProduct();
  }, [slug, page]);
  //Note this
  useEffect(() => {
    loadRelatedProduct();
    loadRelatedPorductCount();
  }, [product]);

  const loadProduct = async () => {
    await getOneProduct(slug)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  };
  const loadRelatedPorductCount = async () => {
    if (product && product.category) {
      await relatedProductsCount(product.category._id)
        .then((res) => setProductsQuantity(res.data))
        .catch((err) => console.log(err));
    }
  };
  const loadRelatedProduct = async () => {
    if (product && product.category) {
      await getRelatedProducts(slug, product.category._id, page)
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
      <div className="row pt-3">
        <SingleProduct
          star={star}
          handleStarRating={handleStarRating}
          product={product}
        />
      </div>
      <div className="row mt-5 text-center">
        <h4 className="text-center pt-3 pb-5 display-7 jumbotron">
          Related Product
        </h4>
        {relatedProducts.map((relatedProduct) => {
          return (
            <div className="col-md-4" key={relatedProduct._id}>
              <ProductCard product={relatedProduct} />
            </div>
          );
        })}
        <Pagination
          className="text-center pt-3"
          current={page}
          total={Math.round((productsQuantity / 3) * 10)}
          onChange={(value) => {
            setPage(value);
          }}
        />
      </div>
    </div>
  );
};
