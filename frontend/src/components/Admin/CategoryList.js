import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid/DataGrid/DataGrid';
import './ProductList.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '@mui/material/Button';
import MetaData from '../layout/MetaData';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Sidebar from './Sidebar';
import {
  deleteCategory,
  clearErrors,
  getCategories,
} from '../../actions/categoryActions';
import { DELETE_CATEGORY_RESET } from '../../constants/categoryConstants';

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, error } = useSelector((state) => state.categories);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.category
  );

  const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success('Category deleted');
      navigate('/admin/categories');
      dispatch({ type: DELETE_CATEGORY_RESET });
    }

    dispatch(getCategories());
  }, [deleteError, dispatch, error, isDeleted, navigate]);

  const columns = [
    { field: 'id', headerName: 'Category ID', minWidth: 300, flex: 1 },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 300,
      flex: 0.5,
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
            <Link to={`/admin/category/${params.getValue(params.id, 'id')}`}>
              <Edit />
            </Link>
            <Button
              onClick={() =>
                deleteCategoryHandler(params.getValue(params.id, 'id'))
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

  categories &&
    categories.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
      });
    });

  return (
    <>
      <MetaData title="All Categories - Admin" />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL CATEGORIES</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            rowsPerPageOptions={[10]}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default CategoryList;
