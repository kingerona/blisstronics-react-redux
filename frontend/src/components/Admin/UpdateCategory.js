import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateCategory,
  getCategoryDetails,
  clearErrors,
} from '../../actions/categoryActions';
import toast from 'react-hot-toast';
import Button from '@mui/material/Button';
import MetaData from '../layout/MetaData';
import Spellcheck from '@mui/icons-material/Spellcheck';
import Sidebar from './Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_CATEGORY_RESET } from '../../constants/categoryConstants';

const UpdateCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { category, error } = useSelector((state) => state.categoryDetails);
  const {
    loading,
    isUpdated,
    error: updateError,
  } = useSelector((state) => state.category);

  const [name, setName] = useState('');

  const { categoryId } = useParams();
  console.log(category);

  useEffect(() => {
    if ((category && category._id !== categoryId) || isUpdated) {
      dispatch(getCategoryDetails(categoryId));
    } else {
      setName(category.name);
    }
    // dispatch(getCategoryDetails(categoryId));

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success('Category updated successfully');
      navigate(`/admin/categories`);
      dispatch({ type: UPDATE_CATEGORY_RESET });
    }
  }, [dispatch, error, navigate, isUpdated, updateError, category, categoryId]);

  const updateCategorySubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('name', name);

    dispatch(updateCategory(categoryId, myForm));
  };

  return (
    <>
      <MetaData title="Update Category" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            onSubmit={updateCategorySubmitHandler}
          >
            <h1>Update Category</h1>

            <div>
              <Spellcheck />
              <input
                type="text"
                placeholder="Category Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateCategory;
