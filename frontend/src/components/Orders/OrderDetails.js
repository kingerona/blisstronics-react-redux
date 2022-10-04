import React, { useEffect } from 'react';
import './OrderDetails.css';
import MetaData from '../layout/MetaData';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { getOrderDetails, clearErrors } from '../../actions/orderActions';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import GoToTop from '../GoToTop';

const OrderDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { orderId } = useParams();

  const { loading, order, error } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch(clearErrors);
    }

    dispatch(getOrderDetails(orderId));
  }, [alert, dispatch, error, orderId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>

              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo && order.paymentInfo.status === 'Paid'
                        ? 'greenColor'
                        : 'redColor'
                    }
                  >
                    {order.paymentInfo && order.paymentInfo.status === 'Paid'
                      ? 'PAID'
                      : 'NOT PAID'}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === 'Delivered'
                        ? 'greenColor'
                        : 'redColor'
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image.url} alt={item.name} />
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      <span>
                        {item.quantity} X &#2547;{item.price} = &#2547;
                        {item.quantity * item.price}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <GoToTop />
        </>
      )}
    </>
  );
};

export default OrderDetails;
