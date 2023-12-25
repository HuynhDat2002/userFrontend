import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartProduct, getUserCart, updateCartProduct } from "../features/user/userSlice";
import axios from "axios";
import { config } from "../utils/axiosConfig";

const Cart = () => {
  axios.defaults.withCredentials=true;


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const productId = searchParams.get("productId");
  const quantity = searchParams.get("quantity");
  const color = searchParams.get("color");

  
  const dispatch = useDispatch();
  const [prodctUpdateDetail, setProdctUpdateDetail ] = useState(null)
  const [totalAmount, setTotalAmount]=useState(null)
  const userCartState=useSelector(state=>state?.auth?.cartProducts)
  console.log("user: ",JSON.parse(localStorage.getItem("customer")))
  console.log("ur",prodctUpdateDetail);
  useEffect(() => {
    dispatch(getUserCart(config))
  }, [])
  useEffect(() => {
    if(prodctUpdateDetail !== null) {
      dispatch(updateCartProduct({cartItemId:prodctUpdateDetail?.cartItemId,quantity:prodctUpdateDetail?.quantity}))
   
      dispatch(getUserCart(config))
 
    }
  }, [prodctUpdateDetail])

  const removeCartProduct = (id) => {
    dispatch(deleteCartProduct(id))
  
      dispatch(getUserCart(config))

  }
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index <userCartState?.length; index++) {
      sum = sum + (Number(userCartState[index].quantity) * userCartState[index].price)
      setTotalAmount(sum)
    }
    if(userCartState?.length===0){
      setTotalAmount(0);
    }
  },[userCartState])
  
  useEffect(() => {
    // Thực hiện các hành động cần thiết dựa trên thông tin sản phẩm từ URL
    if (productId && quantity && color) {
      // Thêm thông tin sản phẩm vào giỏ hàng hoặc hiển thị thông tin sản phẩm
      // Ví dụ: dispatch một action để thêm sản phẩm vào giỏ hàng
       //dispatch(addToCart({ productId, quantity, color }));
    }

    // Lấy thông tin giỏ hàng từ Redux khi trang Cart được load
    dispatch(getUserCart(config));
  }, [dispatch, productId, quantity, color]);
  console.log("userCartState:", userCartState);
  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            { userCartState && userCartState?.map((item, index) => {
              return( <div key={index} className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">

              <div className="cart-col-1 gap-15 d-flex align-items-center">
             <Link className = "d-flex flex-row gap-2" >
                <div className="w-25 ">
                  <img src={item?.productId?.images[0]?.url} className="img-fluid rounded-2" alt="product image" />
                </div>
                <div className="w-75">
                  <p>{item?.productId?.title}</p>
                  <p className="d-flex gap-3">Color: <ul className="colors ps-0">
                    <li style={{backgroundColor:item?.color.title}}></li>
                    </ul></p>
                </div>
             </Link>
              </div>
              <div className="cart-col-2">
                <h5 className="price">{item?.price} VND</h5>
              </div>
              <div className="cart-col-3 d-flex align-items-center gap-15">
                <div>
                  <input
                    className="form-control"
                    type="number"
                    name={"quantity"+item?._id}
                    min={1}
                    max={10}
                    id={"cart"+item?._id}
                    value={prodctUpdateDetail?.quantity ? prodctUpdateDetail?.quantity : item?.quantity}
                    onChange={(e)=>setProdctUpdateDetail({cartItemId:item?._id,quantity:e.target.value})}
                  />
              </div>
              <div>
                <AiFillDelete onClick={()=>removeCartProduct(item?._id)} className="text-danger"/>
              </div>
            </div>
            <div className="cart-col-4">
                <h5 className="price">{item?.price * item?.quantity} VND</h5>
              </div>
            </div>)
            })
          }
        </div>
            
          
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continue To Shopping
              </Link>
              <div className="d-flex flex-column align-items-end">
                <h4>Tổng cộng: {totalAmount} VND  </h4>
                <p>Thuế và phí vận chuyển được tính khi thanh toán</p>
                <Link to="/checkout" className="button">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
