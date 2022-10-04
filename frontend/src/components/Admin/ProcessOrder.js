import AccountTree from '@mui/icons-material/AccountTree';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from '../../actions/orderActions';
import { UPDATE_ORDERS_RESET } from '../../constants/orderConstants';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import './ProcessOrder.css';

const ProcessOrder = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();

  const { loading, order, error } = useSelector((state) => state.orderDetails);
  const { isUpdated, error: updateError } = useSelector((state) => state.order);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('status', status);

    dispatch(updateOrder(orderId, myForm));
  };

  const [status, setStatus] = useState('');

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success('Order updated successfully');
      dispatch({ type: UPDATE_ORDERS_RESET });
    }

    dispatch(getOrderDetails(orderId));
  }, [dispatch, error, isUpdated, orderId, updateError]);

  return (
    <>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === 'Delivered' ? 'block' : 'grid',
              }}
            >
              <div>
                <div className="confirmShippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order &&
                          order.shippingInfo &&
                          order.shippingInfo.phoneNo}
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
                          order.paymentInfo &&
                          order.paymentInfo.status === 'Paid'
                            ? 'greenColor'
                            : 'redColor'
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === 'Paid'
                          ? 'PAID'
                          : 'NOT PAID'}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>&#2547;{order.totalPrice && order.totalPrice}</span>
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
                <div className="confirmCartItems">
                  <Typography>Order Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image.url} alt={item.name} />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          <span>
                            {item.quantity} X &#2547;{item.price} = &#2547;
                            {item.quantity * item.price}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/* */}
              <div
                style={{
                  display: order.orderStatus === 'Delivered' ? 'none' : 'block',
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTree />
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Select Order Status</option>
                      {order.orderStatus === 'Processing' && (
                        <option value="Shipped">Shipped</option>
                      )}
                      {order.orderStatus === 'Shipped' && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={loading || status === '' ? true : false}
                  >
                    Update
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;
