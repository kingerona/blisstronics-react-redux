import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid/DataGrid/DataGrid';
import LaunchIcon from '@mui/icons-material/Launch';
import './MyOrders.css';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { myOrders, clearErrors } from '../../actions/orderActions';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import Typography from '@mui/material/Typography';

const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, orders, error } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, 'status') === 'Delivered'
          ? 'greenColor'
          : 'redColor';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: 'amount',
      headerName: 'Amount (BDT)',
      type: 'number',
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: 'action',
      headerName: 'Actions',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, 'id')}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <>
      <MetaData title={`${user.name} - Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </>
  );
};

export default MyOrders;
