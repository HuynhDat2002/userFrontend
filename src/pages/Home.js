import { Link, useLocation, useNavigate } from "react-router-dom";
import wish from "../images/wish.svg";
import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { addToWishlist } from "../features/products/productSlice";
import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ReactStars from "react-rating-stars-component";
import { getAllBlogs } from "../features/blogs/blogSlice";
import { services } from "../utils/Data";
import { getAllProducts } from '../features/products/productSlice';
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import prodcompare from "../images/prodcompare.svg";
import axios from "axios";
import {config2} from "../utils/axiosConfig";
const Home = () => {

  axios.defaults.withCredentials = true;
  const auth = useSelector((state)=>state?.auth?.user)

  const navigate = useNavigate()

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlogs());
    dispatch(getAllProducts());
  }, []);
  const blogState = useSelector((state) => state?.blog?.blogs);
  const productState = useSelector((state) => state?.product?.products);

  console.log("i", blogState)
  const addToWish = (id) => {
    dispatch(addToWishlist({config:config2(auth),id:id}));
  };
  console.log("productstate: ", productState);
  const itemFeatured = [];
  const itemPopular = [];
  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative">
              <img
                src="images/main-banner-1.jpg"
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>{productState && productState[0]?.tags}</h4>
                <h5>{productState && productState[0]?.title}</h5>
                <p>Giá chỉ từ {productState && productState[0]?.price} VNĐ</p>
                <Link to="/product/:id" className="button">Mua ngay</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content">
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-01.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Sản phẩm tốt nhất</h4>
                  <h5>Ipad S13+ Pro.</h5>
                  <p>
                     $999.00 <br /> hoặc $41.62/tháng.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-02.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Hàng mới</h4>
                  <h5>But Ipad Air</h5>
                  <p>
                     $999.00 <br /> hoặc $41.62/tháng.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-03.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Hàng mới</h4>
                  <h5>But Ipad Air</h5>
                  <p>
                    $999.00 <br /> hoặc $41.62/tháng.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-04.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Hàng mới</h4>
                  <h5>But Ipad Air</h5>
                  <p>
                     $999.00 <br /> hoặc $41.62/tháng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="service d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-2" >
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      <Container>

        <div className="bg-light w-100 my-5">

        </div>
      </Container>
      {/* <Container class1="home-wrapper-2 py-5">
                  <div className="row">
                      <div className="col-12">
                          <div className="categories d-flex justify-content-be....">
                                  <div className="d-flex gap align-items-center" >
                                      <div>
                                          <h6>Music & Gaming</h6>
                                          <p>10 Items</p>
                                      </div>
                                      <img src="images/camera.jpg" alt="camera" />
                                  </div>
                                  <div className="d-flex gap align-items-center" >
                                      <div>
                                          <h6>Cameras</h6>
                                          <p>10 Items</p>
                                      </div>
                                      <img src="images/camera.jpg" alt="camera" />
                                  </div>
                                  <div className="d-flex gap align-items-center" >
                                      <div>
                                          <h6>Smart Tv</h6>
                                          <p>10 Items</p>
                                      </div>
                                      <img src="images/tv.jpg" alt="camera" />
                                  </div>
                                  <div className="d-flex gap align-items-center" >
                                      <div>
                                          <h6>Smart watches</h6>
                                          <p>10 Items</p>
                                      </div>
                                      <img src="images/headphone.jpg" alt="camera" />
                                  </div>
                                  <div className="d-flex gap align-items-center" >
                                    <div>
                                      <h6>Music & Gaming</h6>
                                      <p>10 Items</p>
                                    </div>
                                    <img src="images/camera.jpg" alt="camera" />  
                                  </div>
                                  <div className="d-flex gap align-items-center" >
                                    <div>
                                      <h6>Cameras</h6>
                                      <p>10 Items</p>
                                    </div>
                                    <img src="images/camera.jpg" alt="camera" /> 
                                  </div>
                                  <div className="d-flex gap align-items-center" >
                                    <div>
                                      <h6>Smart Tv</h6>
                                      <p>10 Items</p>
                                    </div>
                                    <img src="images/camera.jpg" alt="camera" /> 
                                  </div>
                                  <div className="d-flex gap align-items-center" >
                                    <div>
                                      <h6>Smart Watches</h6>
                                      <p>10 Items</p>
                                    </div>
                                    <img src="images/camera.jpg" alt="camera" /> 
                                  </div>                          
                                </div>
                          </div>
                  </div>
              </Container> */}
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Bộ sưu tập</h3>
          </div>
          {productState &&
            productState?.map((item, index) => {

              if (item && item.tags === "featured") {

                itemFeatured.push(item)

              }
            })}
          <ProductCard data={itemFeatured} grid={"col-3"} />
        </div>
      </Container>

      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-1.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399or $16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-2.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Studio Display</h5>
                <h6 className="text-dark">600 nits of brightness.</h6>
                <p className="text-dark">27-inch 5K Retina display</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-3.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">smartphones</h5>
                <h6 className="text-dark">smartphones 13 Pro</h6>
                <p className="text-dark">
                  Now in Green. From $99.00 or $41.62/mo. for 24 mo. Footnote*
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-3.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">home speakers</h5>
                <h6 className="text-dark">Room-filling sound.</h6>
                <p className="text-dark">
                  From $699 or $116.58/mo. for 12 mo.*
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Sản phẩm đặc biệt</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "special") {
                return (
                  <SpecialProduct
                    key={index}
                    id={item?._id}
                    brand={item?.brand}
                    title={item?.title}
                    totalrating={item?.totalrating.toString()}
                    price={item?.price}
                    sold={item?.sold}
                    quantity={item?.quantity}
                  />
                );
              }
            })}
        </div>
      </Container>




      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Những sản phẩm nổi tiếng của chúng tôi</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {


              if (item && item.tags === "popular") {

                itemPopular.push(item)

              }
            })}
          <ProductCard data={itemPopular} grid={"col-3"} />


        </div>
      </Container>








      <Container class1="marque-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Tin tức mới nhất</h3>
          </div>
        </div>
        <div className="row">
          {blogState &&
            blogState?.map((item, index) => {
              if (index < 3) {
                return (
                  <div className="col-3" key={index}>
                    <BlogCard
                      id={item?._id}
                      title={item?.title}
                      description={item?.description}
                      image={item?.image[0]?.url}
                      date={moment(item?.createAt).format(
                        "MMMM D0 YYYY, h:mm a"
                      )}
                    />
                  </div>
                );
              }
            })}
        </div>
      </Container>
    </>
  );
};

export default Home;

