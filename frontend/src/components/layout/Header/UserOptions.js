import React, { useState } from 'react';
import './Header.css';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Backdrop from '@mui/material/Backdrop';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { logout } from '../../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const actions = [
    { icon: <ListAltIcon />, name: 'Orders', func: orders },
    { icon: <PersonIcon />, name: 'Profile', func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? 'tomato' : 'unset' }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: 'Logout', func: logOutUser },
  ];

  if (user.role === 'admin') {
    actions.unshift({
      icon: <DashboardIcon />,
      name: 'Dashboard',
      func: dashboard,
    });
  }

  function dashboard() {
    navigate('/admin/dashboard');
  }

  function orders() {
    navigate('/orders');
  }

  function account() {
    navigate('/account');
  }

  function cart() {
    navigate('/cart');
  }

  function logOutUser() {
    dispatch(logout());
    toast.success('Logged out successfully');
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: 10 }} />
      <SpeedDial
        ariaLabel="SpeedDial Tooltip Example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        style={{ zIndex: 11 }}
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : '/Profile.png'}
            alt="Profile"
          />
        }
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
