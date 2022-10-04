import React, { useEffect } from 'react';
import Mouse from '@mui/icons-material/MouseOutlined';
import './Home.css';
import ProductCard from './ProductCard.js';
import { clearErrors, getProducts } from '../../actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import toast from 'react-hot-toast';
import GoToTop from '../GoToTop';
import MetaData from '../layout/MetaData';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProducts());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Home" />
          <div className="banner">
            <p>Welcome to Blisstronics</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll
                <Mouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
      <GoToTop />
    </>
  );
};

export default Home;
