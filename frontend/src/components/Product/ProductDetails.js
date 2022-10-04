import React, { useEffect, useState } from 'react';
import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearErrors,
  getProductDetails,
  newReview,
} from '../../actions/productActions';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import RatingIcon from 'react-rating';
import { AiFillStar } from 'react-icons/ai';
import Loader from '../layout/Loader/Loader';
import GoToTop from '../GoToTop';
import toast from 'react-hot-toast';
import { addItemsToCart } from '../../actions/cartActions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';
import MetaData from '../layout/MetaData';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const submitReviewToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set('rating', rating);
    myForm.set('comment', comment);
    myForm.set('productId', id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success('Review submitted successfully');
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, reviewError, success]);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const options = {
    initialRating: product.ratings,
    readonly: true,
    fractions: 2,
    emptySymbol: (
      <AiFillStar
        fill="rgba(20,20,20,0.1)"
        size={window.innerWidth < 600 ? 10 : 20}
      />
    ),
    fullSymbol: (
      <AiFillStar fill="tomato" size={window.innerWidth < 600 ? 10 : 20} />
    ),
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const increaseQuantity = () => {
    setQuantity((prevQty) => (prevQty < product.stock ? prevQty + 1 : prevQty));
  };

  const decreaseQuantity = () => {
    setQuantity((prevQty) => (prevQty > 1 ? prevQty - 1 : prevQty));
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success('Item added to cart');
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name}`} />
          <div className="productDetails">
            <div className="sliderBlock">
              {product.images && (
                <Swiper
                  style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                  }}
                  loop={true}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                  {product.images.map((item, i) => (
                    <SwiperSlide key={item._id}>
                      <img src={item.url} alt={`${i} Slide`} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
              {product.images && (
                <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  spaceBetween={5}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper"
                >
                  {product.images.map((item, i) => (
                    <SwiperSlide key={item._id}>
                      <img key={i} src={item.url} alt={`${i} Slide`} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>

            <div className="detailsBlocks">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <RatingIcon {...options} />
                <span>
                  ({product.numOfReviews}{' '}
                  {product.numOfReviews < 2 ? 'Review' : 'Reviews'})
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>&#2547; {product.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input value={quantity} type="number" readOnly />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.stock < 1 ? 'redColor' : 'greenColor'}>
                    {product.stock < 1 ? 'OutOfStock' : 'InStock'}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description: <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(Number(e.target.value))}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols={30}
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No reviews yet.</p>
          )}
        </>
      )}
      <GoToTop />
    </>
  );
};

export default ProductDetails;
