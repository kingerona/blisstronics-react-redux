import React from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import { AiFillStar } from 'react-icons/ai';

const ProductCard = ({ product }) => {
  const options = {
    initialRating: product.ratings,
    readonly: true,
    fractions: 2,
    emptySymbol: (
      <AiFillStar
        fill="rgba(20,20,20,0.1)"
        size={window.innerWidth < 600 ? 8 : 20}
      />
    ),
    fullSymbol: (
      <AiFillStar fill="tomato" size={window.innerWidth < 600 ? 8 : 20} />
    ),
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span>
          ({product.numOfReviews}{' '}
          {product.numOfReviews < 2 ? 'Review' : 'Reviews'})
        </span>
      </div>
      <span>৳{product.price}</span>
    </Link>
  );
};

export default ProductCard;
