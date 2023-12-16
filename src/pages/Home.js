import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { services } from "../utils/Data";
import moment from "moment"; 
import { useDispatch,useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import { getAllProducts } from "../features/products/productSlice";
import ReactStars from "react-rating-stars-componet";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import watch2 from "../images/wwatch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { addToWishlist } from "../features/products/productSlice";

const Home = () => {
    const blogState = useSelector((state) => state?.blog?.blog);
    const productState=useSelector((state) => state.product.product);
    const navigate=useNavigate()
    console.log(productState);
}

    const dispatch = useDispatch();
    useEffect(() => {
        getblogs();
        }, []);
    useEffect(() => {
        getProducts();
    } , []);
    const getblogs = () => {
        dispatch(getallBlogs());
    }

    const getallProducts = () => {
        dispatch(getallProducts());
    };
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
                                <h4>SUPERCHARGED FOR PROS.</h4>
                                <h5>Ipad S13+ Pro.</h5>
                                <p>From $999.00 or $41.62/mo.</p>
                                <Link className="button">BUY NOW</Link>
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
                                        <h4>Best Sake</h4>
                                        <h5>Ipad S13+ Pro.</h5>
                                        <p>
                                            From $999.00 <br /> or $41.62/mo.
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
                                        <h4>NEW ARRIVAL</h4>
                                        <h5>But Ipad Air</h5>
                                        <p>
                                            From $999.00 <br /> or $41.62/mo.
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
                                        <h4>NEW ARRIVAL</h4>
                                        <h5>But Ipad Air</h5>
                                        <p>
                                            From $999.00 <br /> or $41.62/mo.
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
                                        <h4>NEW ARRIVAL</h4>
                                        <h5>But Ipad Air</h5>
                                        <p>
                                            From $999.00 <br /> or $41.62/mo.
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
                            <div className="service d-flex align-items-center ju....">
                                {service?.map((i,j) => {
                                    return (
                                        <div className="d-flex align-items-center gap" >
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
                <Container class1="home-wrapper-2 py-5">
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
                            </div>
                        </div>
                    </div>
                </Container>
                <Container class1="special-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="section-heading">Special Products</h3>
                        </div>
                    </div>
                    <div className="row">
                        {productState &&
                        productState?.map((item, index) => {
                            if(item.tags==="special") {
                                return (
                                    <SpecialProduct 
                                        key={index}
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
                            <h3 className="section-heading">Our Popular Products</h3>
                        </div>
                    </div>
                    <div className="row">
                        {productState &&
                        productState?.map((item, index) => {
                            if(item.tags === "popular") {
                                return (
                                    <ProductCard
                                    key={index}
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
    </>
    )
