import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getMyOrder } from "../features/user/userSlice";
import {config2} from "../utils/axiosConfig";
import Container from '../components/Container'

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
  },
  {
    title: "Hãng",
    dataIndex: "brand",
  },
  {
    title: "Số lượng",
    dataIndex: "count",
  },
  {
    title: "Màu sắc",
    dataIndex: "color",
    render: (text, record) => (
      <div style={{ backgroundColor: text, width: '20px', height: '20px' }} className="rounded-5"></div>
    ),
  },
  {
    title: "Giá",
    dataIndex: "amount",
  }
 
];

const GetOrder = () => {
  const location = useLocation();
const auth = useSelector(state=>state.auth?.user)
  const dispatch = useDispatch();
  const orderId = location.pathname.split("/")[2];

  useEffect(() => {
    dispatch(getMyOrder({
      id:orderId,
      config:config2(auth)
    }));
  }, []);
  const orderState = useSelector((state) => state?.auth?.singleorder?.orders);
  console.log(orderState);
  const data1 = [];
  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState?.orderItems[i]?.productId.title,
      brand: orderState?.orderItems[i]?.productId.brand,
      count: orderState?.orderItems[i]?.quantity,
      amount:orderState?.orderItems[i]?.productId.price,
     // color :<div style = {{backgroundColor:orderState?.orderItems[i]?.color?.title}}></div>
      color: orderState?.orderItems[i]?.color?.title,
      
      
      // action: (
      //   <>
      //     <Link to="/" className=" fs-3 text-danger">
      //       <BiEdit />
      //     </Link>
      //     <Link className="ms-3 fs-3 text-danger" to="/">
      //       <AiFillDelete />
      //     </Link>
      //   </>
      // ),
    });
  }
  return (
    <Container class1='cart-wrapper home-wrapper-2 py-5'>

    <div className="my-5">
      <h3 className="mb-4 title">Xem hóa đơn</h3>
      <div>
        <Table columns={columns} dataSource={data1}  />
      </div>
    </div>
    </Container>
  );
};

export default GetOrder;
