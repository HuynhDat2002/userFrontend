import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { addRating ,getAProduct, getAllProducts } from "../features/products/productSlice";
import { toast } from "react-toastify";
import { addProdToCart, getUserCart } from "../features/user/userSlice";
import axios from "axios";
import { config2 } from '../utils/axiosConfig'

const SingleProduct = () => { 
  axios.defaults.withCredentials = true;
  const [isInStock, setIsInStock] = useState(false)
  const [color, setColor] = useState(null)
  console.log("color", color)
  const [quantity, setQuantity] = useState(0)
  console.log("quantity", quantity);
  const [alreadyAdded, setAlreadyAdded] = useState(false)
  const location = useLocation();
  const navigate = useNavigate()
  const getProductId = location.pathname.split("/")[2]
  const dispatch = useDispatch();
  const auth = useSelector((state)=>state?.auth?.user)
  
  const productState = useSelector(state => state?.product?.singleproduct)  
  const productsState = useSelector(state => state?.product?.products)
  console.log("pro", productState)
  const cartState = useSelector(state => state?.auth?.cartProducts)
  useEffect(() => {
    dispatch(getAProduct(getProductId))
    dispatch(getUserCart(config2(auth.token)))
    dispatch(getAllProducts())

  }, [])
  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
    
  }, [cartState, getProductId])

  const uploadCart = () => {
    if (alreadyAdded) {
      navigate('/cart')
    }
    else {

      if (color === null) {
        toast.error("Hãy chọn màu sản phẩm")
        return false
      }
       else if (quantity===0){
        toast.error("Hãy thêm số lượng sản phẩm")
      } 
      else {
        dispatch(addProdToCart({ productId: productState?._id, quantity, color, price: productState?.price, config:config2(auth.token) }))
        setTimeout(() => {
          dispatch(getUserCart(config2(auth.token)))
        }, 200)
         navigate('/cart')
      }
    }
  }
  const props = {
    width: 594,
    height: 600,
    zoomWidth: 600,

    img: productState?.images[0] ? productState?.images[0]?.url : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg",
  };

  const [orderedProduct, setorderedProduct] = useState(true);
  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  const closeModal = () => { };
  const [popularProduct, setPopularProduct] = useState([])
  useEffect(() => {
    let data = []
    for (let index = 0; index < productsState?.length; index++) {
      const element = productsState[index];
      if (element.tag === 'popular') {
        data.push(element)
      }
      setPopularProduct(data)
    }
    if(productState?.quantity ===0 ) setIsInStock(true)
  }, [productState])
  console.log("popularProduct:", popularProduct);

  const [star, setStar] = useState(null)
  const [comment, setComment] = useState(null)
  const addRatingToProduct = () => {
    if (star === null) {
      toast.error("Hãy đánh giá sản phẩm")
      return false
    } else if (comment === null) {
      toast.error("Hãy đánh giá sản phẩm")
      return false
    } else {
      dispatch(addRating({star:star,comment:comment,prodId:getProductId,config:config2(auth.token)}))
      setTimeout(() => {
        dispatch(getAProduct(getProductId))
      }, 100);

    }
    return false
  }


  return (
    <>
      <Meta title={"Tên sản phẩm"} />
      <BreadCrumb title={productState?.title} />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {productState?.images.map((item, index) => {
                return <div>
                  <img
                    src={item?.url}
                    className="img-fluid"
                    alt=""
                  />
                </div>
              })}
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">
                  {productState?.title}
                </h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">$ {productState?.price}</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={Number(productState?.totalrating)}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">{productState?.ratings?.length} Đánh giá </p>
                </div>
                <a className="review-btn" href="#review">
                  Viết đánh giá
                </a>
              </div>
              <div className=" py-3">
                <div className="d-flex gap-10 align-items-center my-2">

                  <h3 className="product-heading">Kiểu :</h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Nhãn hàng :</h3>
                  <p className="product-data">{productState?.brand}</p>
                </div>
                
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">loại :</h3>

                  <p className="product-data">{productState?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Đặc điểm :</h3>
                  <p className="product-data">{productState?.tags}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">


                  <h3 className="product-heading">Trạng thái :</h3>
                 
                  <p className="product-data">{productState?.quantity>0 ? "Còn hàng":"Hết hàng"}</p>
                 

                </div>

                {alreadyAdded === false && <>
                  <div className="d-flex gap-10 flex-column mt-2 mb-3">

                    <h3 className="product-heading">Màu sắc :</h3>

                    <Color colorData={productState?.color} setColor={setColor} />
                  </div>
                </>}
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  {alreadyAdded === false && <>
                    <h3 className="product-heading">Số lượng :</h3>
                    <div className="">
                      <input
                        type="number"
                        name=""
                        min={1}
                        max={productState?.quantity}
                        className="form-control"
                        style={{ width: "70px" }}
                        id=""
                        disabled = {isInStock}
                        onChange={(e) => setQuantity(e.target.value)}
                        defaultValue={quantity}
                      />
                    </div>
                  </>}
                  <div className="d-flex align-items-center gap-30 ms-5">
                    <button
                      className="button border-0"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      type="button"
                      onClick={() => uploadCart()}
                    >
                      {alreadyAdded ? "Tới giỏ hàng" : "Thêm vào giỏ hàng"}
                    </button>
                    {/* <button className="button signup">Buy It Now</button> */}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                 
                  <div>
                    <a href="">

                      <TbGitCompare className="fs-5 me-2" /> Thêm để so sánh
                    </a>
                  </div>
                  <div>
                    <a href="">
              

                      <AiOutlineHeart className="fs-5 me-2" /> Thêm vào mục yêu thích

                    </a>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column  my-3">


                  <h3 className="product-heading">Vận chuyển và hoàn tiền :</h3>
                  <p className="product-data">
                  Miễn phí vận chuyển cho các đơn hàng từ 500.000đ và hoàn tiền có sẵn trên tất cả các đơn đặt hàng! <br /> Chúng tôi vận chuyển tất cả các đơn đặt hàng nội địa Việt Nam trong vòng
                    <b> 5-10 ngày !</b>

                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Link sản phẩm:</h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      copyToClipboard(
                        window.location.href
                      );
                    }}
                  >

                    Sao chép Link sản phẩm

                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">

            <h4>Mô tả</h4>

            <div className="bg-white p-3">
              <p dangerouslySetInnerHTML={{
                __html: productState?.description,
              }}>
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Đánh giá</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>

                  <h4 className="mb-2">Đánh giá của khách hàng</h4>

                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={Number(productState?.totalrating)}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">{productState?.ratings?.length} Đánh giá</p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="">
                      Viết đánh giá
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Viết đánh giá</h4>
                <div>
                  <ReactStars
                    count={5}
                    size={24}
                    value={0}
                    edit={true}
                    activeColor="#ffd700"
                    onChange={(e) => {
                      setStar(e)
                    }}
                  />
                </div>
                <div>
                  <textarea
                    name=""
                    id=""
                    className="w-100 form-control"
                    cols="30"
                    rows="4"
                    placeholder="Viết đánh giá tại đây"

                    onChange={(e) => {
                      setComment(e.target.value)
                    }}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end mt-3">

                  <button onClick={()=>addRatingToProduct()} className="button border-0" type="button">Gửi đánh giá</button>

                </div>
               
              </div>
              <div className="reviews mt-4">
                {
                  productState && productState.ratings?.map((item, index) => {
                    return (
                      <div key={index} className="review">
                        <div className="d-flex gap-10 align-items-center">
                          <ReactStars
                            count={5}
                            size={24}
                            value={item?.star}
                            edit={false}
                            activeColor="#ffd700"
                          />
                        </div>
                        <p className="mt-3">
                          {item?.comment}
                        </p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Sản phẩm phổ biến của chúng tôi</h3>

          </div>
        </div>
        <div className="row">
          <ProductCard data={popularProduct} />
        </div>
      </Container>

      {/* {!alreadyAdded && color !== null && quantity !== 0 &&

        <>
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered ">
              <div className="modal-content">
                <div className="modal-header py-0 border-0">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body py-0">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 w-50">
                      <img src={watch} className="img-fluid" alt="product imgae" />
                    </div>
                    <div className="d-flex flex-column flex-grow-1 w-50">
                      <h6 className="mb-3">Apple Watch</h6>
                      <p className="mb-1">Quantity: asgfd</p>
                      <p className="mb-1">Color: asgfd</p>
                      <p className="mb-1">Size: asgfd</p>
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-0 py-0 justify-content-center gap-30">

                  <button type="button" onClick={() => navigate("/cart")} className="button" data-bs-dismiss="modal">
                    View My Cart
                  </button>
                  <button type="button" className="button signup">
                    Checkout
                  </button>
                </div>
                <div className="d-flex justify-content-center py-3">
                  <Link
                    className="text-dark"
                    to="/product"
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    Continue To Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>

      } */}
    </>
  );
};

export default SingleProduct;
