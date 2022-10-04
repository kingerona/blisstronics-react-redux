import React from 'react';
import { Link } from 'react-router-dom';
import './CartItemCard.css';

const CartItemCard = ({ item, deleteCartItem }) => {
  return (
    <div className="cartItemCard">
      <img src={item.image.url} alt={item.name} />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>Price: &#2547;{item.price}</span>
        <p onClick={() => deleteCartItem(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
