import axios from 'axios';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';
import { createOrder, clearErrors } from '../../actions/orderActions';
import './Payment.scss';

const Payment = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const orderedProducts = cartItems.map((item) => item.name).toString();
  const { address, city, pinCode, state, country, phoneNo } = shippingInfo;
  const { name, email } = user;
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  const [paymentMethod, setPaymentMethod] = useState('quickPay');

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch]);

  const changeHandler = (e) => {
    setPaymentMethod(e.target.value);
  };

  const paymentHandler = async () => {
    const objectId = nanoid(12);
    const orderDetails = {
      _id: objectId,
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: orderInfo.subtotal,
      taxPrice: orderInfo.tax,
      shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.totalPrice,
    };

    orderDetails.paymentInfo = {
      status: 'Pending',
      paymentMethod,
    };

    dispatch(createOrder(orderDetails));

    if (paymentMethod === 'COD') {
      return navigate('/order-confirmation/success');
    }

    if (paymentMethod === 'quickPay') {
      const { data } = await axios.post('/api/v1/payment/process', {
        tranId: objectId,
        address,
        city,
        pinCode,
        state,
        country,
        phoneNo,
        customerName: name,
        customerEmail: email,
        orderedProducts,
        totalAmount: orderInfo.totalPrice,
      });
      if (data.status === 'SUCCESS') {
        window.location.replace(data.url);
      }
    }
  };

  return (
    <>
      <MetaData title="Payment Options" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <div className="paymentOptionsContainer">
          <div className="middle">
            <h1>Choose a payment option</h1>
            <label>
              <input
                disabled={shippingInfo.city !== 'Dhaka'}
                type="radio"
                value="COD"
                checked={paymentMethod === 'COD'}
                onChange={changeHandler}
              />
              <div className="front-end box">
                <span>Cash on Delivery</span>
              </div>
            </label>

            <label>
              <input
                type="radio"
                value="quickPay"
                checked={paymentMethod === 'quickPay'}
                onChange={changeHandler}
              />
              <div className="back-end box">
                <span>Quick Pay</span>
              </div>
            </label>
          </div>
          <button onClick={paymentHandler}>
            {paymentMethod === 'COD' ? 'Complete Order' : 'Proceed to Pay'}
          </button>
        </div>

        <div>
          <p>
            {paymentMethod === 'COD'
              ? 'Payment method "Cash on Delivery" is only available in Dhaka'
              : 'Pay right now using SSLCommerz payment portal. Cash on Delivery is not available outside Dhaka'}
          </p>
        </div>
      </div>
    </>
  );
};

export default Payment;
