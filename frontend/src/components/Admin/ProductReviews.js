import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid/DataGrid/DataGrid';
import './ProductReviews.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllReviews,
  deleteReview,
  clearErrors,
} from '../../actions/productActions';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '@mui/material/Button';
import MetaData from '../layout/MetaData';
import Delete from '@mui/icons-material/Delete';
import Star from '@mui/icons-material/Star';
import Sidebar from './Sidebar';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, reviews, error } = useSelector(
    (state) => state.productReviews
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const [productId, setProductId] = useState('');

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReview(productId, reviewId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success('Review deleted successfully');
      navigate('/admin/reviews');
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [deleteError, dispatch, error, isDeleted, navigate, productId]);

  const columns = [
    { field: 'id', headerName: 'Review ID', minWidth: 200, flex: 0.5 },

    {
      field: 'user',
      headerName: 'User',
      minWidth: 200,
      flex: 0.6,
    },
    { field: 'comment', headerName: 'Comment', minWidth: 350, flex: 1 },
    {
      field: 'rating',
      headerName: 'Rating',
      type: 'number',
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, 'rating') >= 3
          ? 'greenColor'
          : 'redColor';
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, 'id'))
              }
            >
              <Delete />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        comment: item.comment,
        rating: item.rating,
        user: item.name,
      });
    });

  return (
    <>
      <MetaData title="All Reviews - Admin" />

      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Enter Product ID"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading || productId === '' ? true : false}
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              rowsPerPageOptions={[10]}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found!</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
