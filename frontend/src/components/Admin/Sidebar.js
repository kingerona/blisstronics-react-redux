import React from 'react';
import './Sidebar.css';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import TreeItem from '@mui/lab/TreeItem/TreeItem';
import TreeView from '@mui/lab/TreeView/TreeView';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PostAdd from '@mui/icons-material/PostAdd';
import Add from '@mui/icons-material/Add';
import ListAlt from '@mui/icons-material/ListAlt';
import Dashboard from '@mui/icons-material/Dashboard';
import People from '@mui/icons-material/People';
import RateReview from '@mui/icons-material/RateReview';
import Computer from '@mui/icons-material/Computer';
import Category from '@mui/icons-material/Category';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Blisstronics Logo" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <Dashboard /> Dashboard
        </p>
      </Link>

      <TreeView
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<Computer />}
      >
        <TreeItem nodeId="1" label="Products">
          <Link to="/admin/products">
            <TreeItem nodeId="2" label="All" icon={<PostAdd />} />
          </Link>
          <Link to="/admin/product">
            <TreeItem nodeId="3" label="Create" icon={<Add />} />
          </Link>
        </TreeItem>
      </TreeView>

      <TreeView
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<Category />}
      >
        <TreeItem nodeId="1" label="Categories">
          <Link to="/admin/categories">
            <TreeItem nodeId="2" label="All" icon={<PostAdd />} />
          </Link>
          <Link to="/admin/category/new">
            <TreeItem nodeId="3" label="Create" icon={<Add />} />
          </Link>
        </TreeItem>
      </TreeView>

      <Link to="/admin/orders">
        <p>
          <ListAlt /> Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <People /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReview /> Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
