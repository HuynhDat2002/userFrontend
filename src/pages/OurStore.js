import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";
import { useLocation, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../features/products/productSlice";
import { current } from "@reduxjs/toolkit";
// import Select from 'react-select'

const OurStore = () => {
  const [grid, setGrid] = useState(4);
  const  [searchParams,setSearchParams] = useSearchParams();
  const [randomProducts, setRandomProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [brand,setBrand] = useState([])
  //Filer States
  const [categories, setCategories] = useState([]);
  const [tag, setTag] = useState([]);
  const [minPrice, setMinPrice]=useState([]);
  const [maxPrice, setMaxPrice]=useState([]);
  const [sort, setSort]=useState(null);
  const productState = useSelector((state) => state?.product?.products);
  const search = new URLSearchParams(useLocation().search)
  const searchState = useSelector((state) => state?.product?.searchProducts);

  const [popularProduct, setPopularProduct]=useState([])
  console.log("productState: ", productState);
  console.log("sort", sort);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  useEffect(() => {
dispatch(getAllProducts());
  },[]);

 
  useEffect(() => {
    if (productState && productState.length > 0) {
    let category=[]
    let newtags=[]
    let brands=[]
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      category.push(element.category)
      newtags.push(element.tags)
      brands.push(element.brand)
      
    }
    setCategory(category)
    setTags(newtags)
    setBrand(brands)
  }
  }, [productState])
  console.log('colection: ',[...new Set(category)],[...new Set(tags)],[...new Set(brand)]);

  useEffect(() => {
    if (productState && productState.length > 0) {
      const randomIndices = getRandomIndices(); // Chọn 2 sản phẩm ngẫu nhiên
      //const randomProductsData = randomIndices.map((index) => productState[index]);
      setRandomProducts(randomIndices);
    }
  }, [productState]);
 
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
  
  const handleCategoryChange = (selectedOptions) =>{
      setCategories(selectedOptions)
  }
  useEffect(()=>{
   
    const string=  (categories.map(item=>item.value)).join(',')
    console.log('ccccc',string);

      if( categories.map(item=>item.value).length>0){

        handleFilter(string,'category')
      }

  },[categories])
    
    console.log('caate',[...new Set(category)]);


  const currentUrl= new URL(window.location.href);
  console.log("current",currentUrl);
  console.log("random:", randomProducts);

  const handleFilter = (item,key)=>{
  setSearchParams(params=>params.set(key,item))
  currentUrl.search = searchParams.toString();
  // dispatch(searchProducts(`${key}=${(searchParams.get(key)).toString()}`));
  navigate(`${currentUrl.search}`)
}

console.log('search',searchParams);
  useEffect(()=>{
    if(searchParams.size!==0){
      
      dispatch(searchProducts(`${currentUrl.search}`));
    console.log('search',searchParams);
  }
},[searchParams])
  const categoriess=[...new Set(category)].map((item)=>({label:item,value:item}))
console.log('categoriess',categoriess)
  return (
    <>
      <Meta title={"Sản phẩm"} />
      <BreadCrumb title="Sản phẩm" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Loại sản phẩm</h3>
                <div>
                  <ul className="ps-0">
                    {
                      category && [...new Set(category)].map((item, index) => {
                        return <li key={index} onClick={() => handleFilter(item,'category')}>{item}</li>
                      })
                    }
                  </ul>
                </div>
                  {/* <Select
                  value={categories}
                    isMulti
                    options={categoriess}
                    onChange={(selectedOptions)=>handleCategoryChange(selectedOptions)}
                  /> */}
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Hãng</h3>
              <div>
                <ul className="ps-0">
                  {
                    brand && [...new Set(brand)].map((item, index) => {
                      return <li key={index} onClick={() => handleFilter(item,'brand')}>{item}</li>
                    })
                  }
                </ul>
              </div>
            </div>
           
           
            <div className="filter-card mb-3">
              <h3 className="filter-title">Lọc bởi</h3>
              <div>
                {/* <h5 className="sub-title">Khả dụng</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                    <label className="form-check-label" htmlFor="">
                      Còn hàng (1)
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
                      Hết hàng (0)
                    </label>
                  </div>
                </div> */}
                <h5 className="sub-title">Giá</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                      onChange={(e)=>setMinPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Từ</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                      onChange={(e)=>setMaxPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput1">Đến</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Thẻ sản phẩm</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                {
                    tags && [...new Set(tags)].map((item, index) => {
                      return (<button  onClick={() => handleFilter(item,'tags')} key={index} className=" border border-0 text-capitalize  badge bg-light text-secondary rounded-3 py-2 px-3">
                        {item}</button>)
                    })
                  }
                </div>
              </div>
            </div>
            <div className="filter-card mb-3" >
              <h3 className="filter-title">Sản phẩm ngẫu nhiên</h3>
              <div>
                {randomProducts?.map((product) => (
                  <div className="random-products mb-3 d-flex  justify-content-center" key={product?._id}>
                    <div className="w-50 p-2">
                      <img
                        src={product?.images[0]?.url}
                        className="img-fluid"
                        alt={product?.title}
                      />
                      <h5 className="mw-90">
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
                    Sắp xếp:
                  </p>
                  <select
                    name=""
                    defaultValue={"manula"}
                    className="form-control form-select"
                    id=""
                    onChange={(e)=>setSort(e.target.value)}
                  >
                    
                    <option value="title"> A-Z</option>
                    <option value="-title">
                      Z-A
                    </option>
                    <option value="price">Giá thấp đến cao</option>
                    <option value="-price">Giá cao đến thấp</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <p className="totalproducts mb-0">{searchParams.size>0 ? searchState?.length : productState?.length} Sản phẩm</p>
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
                {
                  searchState && searchState.length>0 && 
                  <ProductCard
                  data={searchState ? searchState : []}
                  grid={grid}
                />
                }
                {
                  !searchState &&
                <ProductCard
                  data={productState ? productState : []}
                  grid={grid}
                />
                }

              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
