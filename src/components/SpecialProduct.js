
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
const SpecialProduct = (props) => {
  const { title, brand, totalrating, price, sold, quantity,id } =props;
  const [remainingTime, setRemainingTime] = useState({ days: 5, hours: 18, minutes: 32, seconds: 21 });

  useEffect(() => {
    const timer = setInterval(() => {
      // Update the remaining time logic here
      setRemainingTime((prevTime) => {
        let updatedTime = { ...prevTime };

        if (updatedTime.seconds > 0) {
          updatedTime.seconds -= 1;
        } else {
          if (updatedTime.minutes > 0) {
            updatedTime.minutes -= 1;
            updatedTime.seconds = 59;
          } else {
            if (updatedTime.hours > 0) {
              updatedTime.hours -= 1;
              updatedTime.minutes = 59;
              updatedTime.seconds = 59;
            } else {
              if (updatedTime.days > 0) {
                updatedTime.days -= 1;
                updatedTime.hours = 23;
                updatedTime.minutes = 59;
                updatedTime.seconds = 59;
              } else {
                clearInterval(timer);
              }
            }
          }
        }

        return updatedTime;
      });
    }, 1000);

    // Clear interval when component unmounts
    return () => clearInterval(timer);
  }, []);

  console.log(quantity / quantity +sold*100);

 

  return (
    <>
      <div className="col-6 mb-3">
        <div className="special-product-card">
          <div className="d-flex justify-content-between">
            <div>
              <img src="images/watch.jpg" className="img-fluid" alt="watch" />
            </div>
            <div className="special-product-content">
              <h5 className="brand">{brand}</h5>
              <h6 className="title">{title}</h6>
              <ReactStars
                count={5}
                size={24}
                value={4}
                edit={totalrating}
                activeColor="#ffd700"
              />
              <p className="price">
                <span className="red-p">${price}</span> &nbsp;{" "}
                {/* <strike>$200</strike> */}
              </p>
              { <div className="discount-till d-flex align-items-center gap-10">
                <p className="mb-0">
                  <b>{remainingTime.days} </b>ngày
                </p>
                <div className="d-flex gap-10 align-items-center">
                  <span className="badge rounded-circle p-3 bg-danger">{remainingTime.hours}</span>giờ:
                  <span className="badge rounded-circle p-3 bg-danger">{remainingTime.minutes}</span>phút:
                  <span className="badge rounded-circle p-3 bg-danger">{remainingTime.seconds}</span>giây
                </div>
              </div> }
              <div className="prod-count my-3">
                <p>Số lượng còn lại: {quantity}</p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width:quantity/quantity+sold*100 +"%" }}
                    aria-valuenow={quantity/quantity+sold*100}
                    aria-valuemin={quantity}
                    aria-valuemax={sold+quantity}
                  ></div>
                </div>
              </div>

              <Link className="button" to={'/product/'+id}>Xem sản phẩm</Link>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialProduct;
