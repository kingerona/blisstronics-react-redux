import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid/DataGrid/DataGrid';
import './ProductList.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Button from '@mui/material/Button';
import MetaData from '../layout/MetaData';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Sidebar from './Sidebar';
import {
  getAllUsers,
  clearErrors,
  deleteUser,
} from '../../actions/userActions';
import { DELETE_USER_RESET } from '../../constants/userConstant';

const UserList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { users, error } = useSelector((state) => state.allUsers);
  const {
    isDeleted,
    message,
    error: deleteError,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      navigate('/admin/users');
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [alert, deleteError, dispatch, error, isDeleted, message, navigate]);

  const columns = [
    { field: 'id', headerName: 'User ID', minWidth: 180, flex: 0.5 },
    { field: 'email', headerName: 'Email', minWidth: 200, flex: 1 },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: 'role',
      headerName: 'Role',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, 'role') === 'admin'
          ? 'redColor'
          : 'greenColor';
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
            <Link to={`/admin/user/${params.getValue(params.id, 'id')}`}>
              <Edit />
            </Link>
            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, 'id'))
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

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        email: item.email,
        role: item.role,
        name: item.name,
      });
    });

  return (
    <>
      <MetaData title="All Users - Admin" />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

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

export default UserList;
