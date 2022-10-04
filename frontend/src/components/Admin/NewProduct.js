import React, { useEffect, useState } from 'react';
import './NewProduct.css';
import { useSelector, useDispatch } from 'react-redux';
import { createProduct, clearErrors } from '../../actions/productActions';
import { useAlert } from 'react-alert';
import Button from '@mui/material/Button';
import MetaData from '../layout/MetaData';
import AccountTree from '@mui/icons-material/AccountTree';
import Description from '@mui/icons-material/Description';
import Storage from '@mui/icons-material/Storage';
import Spellcheck from '@mui/icons-material/Spellcheck';
import AttachMoney from '@mui/icons-material/AttachMoney';
import Sidebar from './Sidebar';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, product, success, error } = useSelector(
    (state) => state.newProduct
  );

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    'Desktop',
    'Laptop',
    'Mouse',
    'Keyboard',
    'RAM',
    'Graphics Card',
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Product created successfully');
      dispatch({ type: NEW_PRODUCT_RESET });
      navigate(`/admin/product/${product._id}`);
    }
  }, [alert, dispatch, error, navigate, product._id, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('price', price);
    myForm.set('description', description);
    myForm.set('category', category);
    myForm.set('stock', stock);

    images.forEach((image) => {
      myForm.append('images', image);
    });

    dispatch(createProduct(myForm));
  };

  const createProductImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <Spellcheck />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoney />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <Description />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <AccountTree />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Storage />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImageChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
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

export default NewProduct;
