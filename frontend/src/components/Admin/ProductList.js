import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid/DataGrid/DataGrid';
import './ProductList.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAdminProducts,
  deleteProduct,
  clearErrors,
} from '../../actions/productActions';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '@mui/material/Button';
import MetaData from '../layout/MetaData';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Sidebar from './Sidebar';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, error } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      toast.success('Product deleted successfully');
      navigate('/admin/products');
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProducts());
  }, [deleteError, dispatch, error, isDeleted, navigate]);

  const columns = [
    { field: 'id', headerName: 'Product ID', minWidth: 200, flex: 0.5 },
    { field: 'name', headerName: 'Name', minWidth: 350, flex: 1 },
    {
      field: 'stock',
      headerName: 'Stock',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      minWidth: 270,
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
            <Link to={`/admin/product/${params.getValue(params.id, 'id')}`}>
              <Edit />
            </Link>
            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, 'id'))
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <>
      <MetaData title="All Products - Admin" />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList;
