import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Dangerous from '@mui/icons-material/Dangerous';
import Typography from '@mui/material/Typography';
import './OrderConfirmation.css';
import { useParams, Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import GoToTop from '../GoToTop';

const OrderSuccess = () => {
  const { orderStatus } = useParams();

  return (
    <div className="orderConfirmation">
      <MetaData title="Order Confirmation" />
      {orderStatus === 'success' && (
        <>
          <CheckCircleIcon />
          <Typography>Your Order has been placed successfully.</Typography>
          <Link to="/orders">View Orders</Link>
        </>
      )}
      {orderStatus === 'fail' && (
        <>
          <Dangerous />
          <Typography>The payment was not completed successfully.</Typography>
          <Link to="/cart">Go back to your cart</Link>
        </>
      )}
      {orderStatus === 'cancel' && (
        <>
          <Dangerous />
          <Typography>The payment has been cancelled.</Typography>
          <Link to="/cart">Go back to your cart</Link>
        </>
      )}
      <GoToTop />
    </div>
  );
};

export default OrderSuccess;
