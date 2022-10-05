import React, { useEffect, useState } from 'react';
import './NewProduct.css';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import Button from '@mui/material/Button';
import MetaData from '../layout/MetaData';
import Spellcheck from '@mui/icons-material/Spellcheck';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { NEW_CATEGORY_RESET } from '../../constants/categoryConstants';
import { createCategory, clearErrors } from '../../actions/categoryActions';

const NewCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector((state) => state.newCategory);

  const [name, setName] = useState('');

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success('Category created!');
      dispatch({ type: NEW_CATEGORY_RESET });
      navigate('/admin/categories');
    }
  }, [dispatch, error, navigate, success]);

  const createCategorySubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('name', name);

    dispatch(createCategory(myForm));
  };

  return (
    <>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            onSubmit={createCategorySubmitHandler}
          >
            <h1>Create Category</h1>

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
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewCategory;
