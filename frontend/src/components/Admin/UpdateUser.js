import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import Button from '@mui/material/Button';
import MetaData from '../layout/MetaData';
import MailOutline from '@mui/icons-material/MailOutline';
import Person from '@mui/icons-material/Person';
import VerifiedUser from '@mui/icons-material/VerifiedUser';
import Sidebar from './Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_USER_RESET } from '../../constants/userConstant';
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from '../../actions/userActions';
import Loader from '../layout/Loader/Loader';

const UpdateUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { loading, user, error } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    isUpdated,
    error: updateError,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if ((user && user._id !== userId) || isUpdated) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('User updated successfully');
      dispatch({ type: UPDATE_USER_RESET });
      navigate(`/admin/user/${user._id}`);
    }
  }, [alert, dispatch, error, isUpdated, navigate, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('role', role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <>
      <MetaData title="Update User" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <Person />
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutline />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUser />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={updateLoading || role === '' ? true : false}
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
