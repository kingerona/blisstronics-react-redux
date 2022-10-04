import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartActions';
import './Cart.css';
import CartItemCard from './CartItemCard.js';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Typography from '@mui/material/Typography';
import MetaData from '../layout/MetaData';
import GoToTop from '../GoToTop';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (quantity >= stock) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (quantity <= 1) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItem = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkOutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <MetaData title="Cart" />
          <RemoveShoppingCartIcon />
          <Typography>No Product in Your Cart.</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <>
          <div className="cartPage">
            <MetaData title="Cart" />
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div key={item.product} className="cartContainer">
                  <CartItemCard item={item} deleteCartItem={deleteCartItem} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">
                    &#2547;{item.price * item.quantity}
                  </p>
                </div>
              ))}

            <div className="cartGrossTotal">
              <div></div>
              <div className="cartGrossTotalBox">
                <p>Gross Total:</p>
                <p>
                  &#2547;
                  {cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}
                </p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkOutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </>
      )}
      <GoToTop />
    </>
  );
};

export default Cart;
