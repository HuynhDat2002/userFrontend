import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/products/productSlice";
import { Link } from "react-router-dom";
import view from "../images/view.svg";
import ReactStars from "react-rating-stars-component";
import { useLocation } from "react-router-dom";



const Wishlist = () => {
    let location = useLocation();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProductWishlist());
    }, []);

    const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);

    console.log("t", wishlistState)
    const removeFromWishlist = (id) => {
        dispatch(addToWishlist(id));
        setTimeout(() => {
            dispatch(getUserProductWishlist());
        }, 300);    
    };
    const grid = 3
    return (
        <>
            <Meta title={"Danh sách yêu thích"} />
            <BreadCrumb title="Danh sách yêu thích" />
            <Container className="wishlist-wrapper home-wrapper-2 py-5">
                <div className="row">
                    {wishlistState?.length === 0 && (
                        <div className="text-center fs-3">Bạn chưa thích sản phẩm nào </div>
                    )};
                    {wishlistState?.map((item, index) => {
                        return (
                            <div

                                key={index}
                                className={` ${location.pathname === "/product" ? `gr-${grid}` : "col-3"
                                    } `}

                            >
                                <div
                                    className="product-card position-relative"
                                >
                                   
                                    <div className="product-image">
                                        <img
                                            src={item?.images[0]?.url}
                                            className="img-fluid d-block mx-auto"
                                            alt="product image"
                                            width={160}
                                        />

                                    </div>
                                    <div className="product-details">
                                        <h6 className="brand">{item?.brand}</h6>
                                        <h5 className="product-title">
                                            {item?.title}
                                        </h5>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={item?.totalrating.toString()}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        <p
                                            className={`description ${grid === 12 ? "d-block" : "d-none"
                                                }`}
                                            dangerouslySetInnerHTML={{ __html: item?.description }}
                                        ></p>
                                        <p className="price">$ {item?.price}</p>
                                    </div>
                                    <div className="action-bar position-absolute">
                                        <div className="d-flex flex-column gap-3 ">
                                            <button className="border-0 bg-transparent" >

                                            <img
                                                onClick={() => {
                                                    removeFromWishlist(item?._id);
                                                }}
                                                src="images/cross.svg"
                                                alt="cross"
                                                className=" cross img-fluid border-0 bg-transparent"
                                                
                                                />
                                                </button>

                                           
                                            <button className="border-0 bg-transparent">
                                                <Link to={`/product/${item?._id}`}>
                                                    <img src={view} alt="view" />
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    )

                    }




                </div>
            </Container>
        </>
    );
};

export default Wishlist;