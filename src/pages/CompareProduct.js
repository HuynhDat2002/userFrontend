import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Color from "../components/Color";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
//import { type } from "@testing-library/user-event/dist/types/utility";

const CompareProduct = ({ product }) => {
  const {
    title,
    price,
    brand,
    quantity,
    color,
    sold,
    image,
  } = product;
  return (
    <>
      <Meta title={"Compare Products"} />
      <BreadCrumb title="Compare Products" />
      <Container class1="compare-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="compare-product-card position-relative">
              <img
                src={image}
                alt="Product"
                className="position-absolute cross img-fluid"
              />
              {/* <div className="product-card-image">
                <img src="images/watch.jpg" alt="watch" />
              </div> */}
              <div className="compare-product-details">
                <h5 className="title">{title}</h5>
                <h6 className="price mb-3 mt-3">{price}</h6>

                <div>
                  <div className="product-detail">
                    <h5>Brand:</h5>
                    <p>{brand}</p>
                  </div>
                  <div className="product-detail">
                    <h5>Quantity:</h5>
                    <p>{quantity}</p>
                  </div>
                  <div className="product-detail">
                    <h5>Color:</h5>
                    <p>{color}</p>
                  </div>
                  <div className="product-detail">
                    <h5>Sold:</h5>
                    <div className="d-flex gap-10">
                      <p>{sold}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="compare-product-card position-relative">
              <img
                src={image}
                alt="Product"
                className="position-absolute cross img-fluid"
              />
              {/* <div className="product-card-image">
                <img src={image} alt="product" />
              </div> */}
              <div className="compare-product-details">
                <h5 className="title">{title}</h5>
                <h6 className="price mb-3 mt-3">{price}</h6>

                <div>
                  <div className="product-detail">
                    <h5>Brand:</h5>
                    <p>{brand}</p>
                  </div>
                  <div className="product-detail">
                    <h5>Quantity:</h5>
                    <p>{quantity}</p>
                  </div>
                  <div className="product-detail">
                    <h5>Color:</h5>
                    <p>{color}</p>
                  </div>
                  <div className="product-detail">
                    <h5>Sold:</h5>
                    <div className="d-flex gap-10">
                      <p>{sold}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CompareProduct;
