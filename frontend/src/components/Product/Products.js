import React, { useEffect, useState } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProducts } from '../../actions/productActions';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import GoToTop from '../GoToTop';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';

const categories = [
  'Desktop',
  'Laptop',
  'Mouse',
  'Keyboard',
  'RAM',
  'Graphics Card',
];

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 50000]);
  const [category, setCategory] = useState('');
  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    window.scrollTo(0, 0);
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  let count = filteredProductsCount;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Products" />
          <h2 className="productsHeading">
            {category ? category : 'Products'}
          </h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={50000}
              size="small"
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  key={category}
                  className="category-link"
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => setRatings(newRating)}
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
                size="small"
                valueLabelDisplay="auto"
              />
            </fieldset>
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
      <GoToTop />
    </>
  );
};

export default Products;
