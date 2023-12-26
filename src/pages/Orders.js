    import React, { useEffect } from 'react'
    import Container from '../components/Container'
    import BreadCrumb from '../components/BreadCrumb'
    import { useDispatch, useSelector } from 'react-redux'
    import { getOrders } from '../features/user/userSlice'

    const Orders = () => {
        const dispatch = useDispatch()
        const orderState = useSelector (state => state?.auth?.getorderedProduct?.orders)
        console.log("abc",orderState);

        useEffect(()=>{
            dispatch(getOrders())
        },[])    
    return (
        <>
            <BreadCrumb title='Đơn hàng của tôi'/>
                <Container class1='cart-wrapper home-wrapper-2 py-5'>
                    <div className="row">
                        <div className='col-12'>
                            <div className='row'>
                                <div className="col-3">
                                    <h5>Mã đơn hàng</h5>
                                </div>
                                <div className="col-3">
                                    <h5>Tổng cộng</h5>
                                </div>
                                <div className="col-3">
                                    <h5>Số tiền sau khi đã giảm giá</h5>
                                </div>
                                <div className="col-3">
                                    <h5>Trạng thái</h5>
                                </div>
                            </div>  

                        </div>
                        <div className="col-12 mt-3">
                        {
                            orderState && orderState?.map((item, index) => {
                                return (
                                    <div className='row my-3' key={index}>
                                <div className="col-3">
                                    <p>{item?._id}</p>
                                </div>
                                <div className="col-3">
                                    <p>{item?.totalPrice}</p>
                                </div>
                                <div className="col-3">
                                    <p>{item?.totalPriceAfterDiscount}</p>
                                </div>
                                <div className="col-3">
                                    <p>{item?.orderStatus}</p>
                                </div>
                                <div className="col-12">
                                    <div className="row bg-secondary">
                                    <div className="col-3">
                                    <h6>Tên sản phẩm</h6>
                                </div>
                                <div className="col-3">
                                    <h6>Số lượng</h6>
                                </div>
                                <div className="col-3">
                                    <h6>Giá</h6>
                                </div>
                                <div className="col-3">
                                    <h6>Màu sắc</h6>
                                </div>
                                {
                                    item?.orderItems?.map((i,index)=>{
                                        return (<div className="col-12">
                                        <div className="row bg-secondary">
                                        <div className="col-3">
                                        <p>{i?.product?.title}</p>
                                    </div>
                                    <div className="col-3">
                                        <p>{i?.quantity}</p>
                                    </div>
                                    <div className="col-3">
                                        <p>{i?.price}</p>
                                    </div>
                                    <div className="col-3">
                                        <p>Màu sắc</p>
                                    </div>
                                        </div>
                                    </div>)
                                    })
                                }
                                    </div>
                                </div>
                            </div>
                                )
                            })
                        }
                        </div>                
                    </div>
                </Container>
        </>
        
    )
    }

    export default Orders
