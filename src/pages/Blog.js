import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import moment from "moment";

const Blog = () => {
    const blogState = useSelector((state) => state?.blog?.blog);

    const dispatch = useDispatch();
    useEffect(() => {
        getAllBlogs();
    },[]);
    const getblogs = () => {
        dispatch(getAllBlogs());
    };
  return (
    <>
      <Meta title={"Tin tức"} />
      <BreadCrumb title="Tin tức" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Tìm theo danh mục</h3>
              <div>
                <ul className="ps-0">
                  <li>Đồng hồ</li>
                  <li>Headphone</li>
                  <li>Máy ảnh</li>
                  <li>Laptop</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="row">
                {blogState &&
                blogState?.map((item, index) => {
                    return (
                        <div className="col-6 mb-3" key={index}>
                            <BlogCard
                                id={item?._id}
                                title={item?.title}
                                description={item?.description}
                                image={item?.image[0]?.url}
                                date={moment(item?.createdAt).format(
                                    "MMMM Do YYYY, h:mm a"
                                )}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
    </Container>
    </>
  );
};

export default Blog;