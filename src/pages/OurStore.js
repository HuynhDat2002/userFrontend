import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";

const OurStore = () => {
  const [grid, setGrid] = useState(4);

  const [randomProducts, setRandomProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState([]);
  
  
  //Filer States
  const [categories, setCategories] = useState([]);
  const [tag, setTag] = useState([]);
  const [minPrice, setMinPrice]=useState([]);
  const [maxPrice, setMaxPrice]=useState([]);
  const [sort, setSort]=useState(null);
  const productState = useSelector((state) => state?.product?.products);
  console.log("productState: ", productState);
  console.log("sort", sort);
  const dispatch = useDispatch();
  
  useEffect(() => {
dispatch(getAllProducts());
  },[]);

 
  useEffect(() => {
    if (productState && productState.length > 0) {
    let category=[]
    let newtags=[]
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      category.push(element.category)
      newtags.push(element.tags)
      
    }
    setCategory(category)
    setTags(newtags)
  }
  }, [productState])
  console.log([...new Set(category)],[...new Set(tags)]);
 
    
  useEffect(() => {
    if (productState && productState.length > 0) {
      const randomIndices = getRandomIndices(); // Chọn 2 sản phẩm ngẫu nhiên
      //const randomProductsData = randomIndices.map((index) => productState[index]);
      setRandomProducts(randomIndices);
    }
  }, [productState]);
 
  console.log("s",productState);
  const getRandomIndices = () => {
    const randomValues = [];
    while (randomValues.length < 2) {
      const randomIndex = Math.floor(Math.random() * productState.length); // Lấy chỉ số ngẫu nhiên từ 0 đến chiều dài của mảng
      const randomElement = productState[randomIndex]; // Lấy phần tử tương ứng với chỉ số ngẫu nhiên
      if (!randomValues.includes(randomElement)) {
        randomValues.push(randomElement); // Thêm giá trị vào mảng randomValues nếu chưa có trong đó
      }
    }
    return randomValues;
  };
  console.log("random:", randomProducts);


  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
                <ul className="ps-0">
                  {
                    category && [...new Set(category)].map((item, index) => {
                      return <li key={index} onClick={() => setCategories(item)}>{item}</li>
                    })
                  }
                </ul>
              </div>
            </div>
           
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
                <h5 className="sub-title">Availablity</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                    <label className="form-check-label" htmlFor="">
                      In Stock (1)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                    <label className="form-check-label" htmlFor="">
                      Out of Stock(0)
                    </label>
                  </div>
                </div>
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                      onChange={(e)=>setMinPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                      onChange={(e)=>setMaxPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Tags</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                {
                    tags && [...new Set(tags)].map((item, index) => {
                      return (<span onClick={() => setTag(item)} key={index} className=" text-capitalize  badge bg-light text-secondary rounded-3 py-2 px-3">
                        {item}</span>)
                    })
                  }
                </div>
              </div>
            </div>
            <div className="filter-card mb-3" >
              <h3 className="filter-title">Random Product</h3>
              <div>
                {randomProducts?.map((product) => (
                  <div className="random-products mb-3 d-flex  justify-content-center" key={product?._id}>
                    <div className="w-50">
                      <img
                        src={product?.images[0]?.url}
                        className="img-fluid"
                        alt={product?.title}
                      />
                      <h5>
                        {product.title}
                      </h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value={product.totalrating}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <b>${product.price}</b>
                    </div>
                  </div>

                ))}

              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block" style={{ width: "100px" }}>
                    Sort By:
                  </p>
                  <select
                    name=""
                    defaultValue={"manula"}
                    className="form-control form-select"
                    id=""
                    onChange={(e)=>setSort(e.target.value)}
                  >
                    
                    <option value="title">Alphabetically, A-Z</option>
                    <option value="-title">
                      Alphabetically, Z-A
                    </option>
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                    <option value="createdAt">Date, old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <p className="totalproducts mb-0">{productState?.length} Products</p>
                  <div className="d-flex gap-10 align-items-center grid">
                    {/* <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      src="images/gr3.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(6);
                      }}
                      src="images/gr2.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />

                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    /> */}
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">

                <ProductCard
                  data={productState ? productState : []}
                  grid={grid}
                />

              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
