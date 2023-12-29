import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrder } from "../features/user/userSlice";
import {config2} from '../utils/axiosConfig'
import Container from '../components/Container'

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "name",
  },
  {
    title: "Sản Phẩm",
    dataIndex: "product",
  },
  {
    title: "Tổng cộng",
    dataIndex: "amount",
  },
  {
    title: "Ngày mua",
    dataIndex: "date",
  },

  {
    title: "Trạng thái",
    dataIndex: "status",
  },
];

const Orders = () => {
const auth = useSelector(state=>state.auth.user)
const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder({
      id:auth._id,
      config:config2(auth)
    }));
  }, []);
  const orderState = useSelector((state) => state.auth?.orders?.orders);

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i]?.shippingInfo?.name ,
      product: (
        <Link to={`/myorder/${orderState[i]?._id}`}>
          Xem chi tiết
        </Link>
      ),
      amount: orderState[i]?.totalPriceAfterDiscount,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      status:orderState[i].orderStatus  === "Dispatched" ? "Đã gửi" :
      orderState[i].orderStatus  === "Ordered" ? "Đã đặt hàng" :
      orderState[i].orderStatus  === "Not Processed" ? "Không xử lý" :
      orderState[i].orderStatus  === "Processing" ? "Đang xử lý":
      orderState[i].orderStatus  === "Cancelled" ?"Đã hủy":
      orderState[i].orderStatus  === "Delivered" ? "Đã giao hàng" : "Không xác định" 

    });
  }


  return (
    <Container class1='cart-wrapper home-wrapper-2 py-5'>

    <div className="my-5">
      <h3 className="mb-4 title">Đơn đặt hàng</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
    </Container>
  );
};

export default Orders;
