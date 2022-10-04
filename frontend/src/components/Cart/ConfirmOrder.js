import Typography from '@mui/material/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';
import './ConfirmOrder.css';

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = shippingInfo.city === 'Dhaka' ? 0 : 150;
  const tax = Number((subtotal * 0.15).toFixed(2));
  const totalPrice = subtotal + shippingCharges + tax;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem('orderInfo', JSON.stringify(data));

    navigate('/process/payment');
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems.map((item) => (
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
        {/* */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>&#2547;{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>&#2547;{shippingCharges}</span>
              </div>
              <div>
                <p>Tax Fee:</p>
                <span>&#2547;{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>&#2547;{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed to Payment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
