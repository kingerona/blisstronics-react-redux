import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateProfile.css';
import MailOutline from '@mui/icons-material/MailOutline';
import Face from '@mui/icons-material/Face';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateProfile,
  clearErrors,
  loadUser,
} from '../../actions/userActions';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { loading, isUpdated, error } = useSelector((state) => state.profile);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('/Profile.png');
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png');

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('avatar', avatar);

    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }

    if (isUpdated) {
      alert.success('Profile updated successfully');
      dispatch(loadUser());
      navigate('/account');
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, alert, error, user, isUpdated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>
              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <Face />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutline />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
