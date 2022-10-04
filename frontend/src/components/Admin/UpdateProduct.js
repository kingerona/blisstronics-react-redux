import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateProduct,
  getProductDetails,
  clearErrors,
} from '../../actions/productActions';
import { useAlert } from 'react-alert';
import Button from '@mui/material/Button';
import MetaData from '../layout/MetaData';
import AccountTree from '@mui/icons-material/AccountTree';
import Description from '@mui/icons-material/Description';
import Storage from '@mui/icons-material/Storage';
import Spellcheck from '@mui/icons-material/Spellcheck';
import AttachMoney from '@mui/icons-material/AttachMoney';
import Sidebar from './Sidebar';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { product, error } = useSelector((state) => state.productDetails);
  const {
    loading,
    isUpdated,
    error: updateError,
  } = useSelector((state) => state.product);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    'Desktop',
    'Laptop',
    'Mouse',
    'Keyboard',
    'RAM',
    'Graphics Card',
  ];

  const { productId } = useParams();

  useEffect(() => {
    if ((product && product._id !== productId) || isUpdated) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
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
      alert.success('Product updated successfully');
      navigate(`/admin/product/${productId}`);
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    alert,
    dispatch,
    error,
    navigate,
    isUpdated,
    product,
    productId,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
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

    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
      <MetaData title="Update Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

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
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
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
                onChange={updateProductImageChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
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
              Update
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
