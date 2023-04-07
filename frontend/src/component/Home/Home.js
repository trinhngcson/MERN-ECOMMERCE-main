import React, {Fragment, useEffect} from 'react';
import { CgMouse } from 'react-icons/all';
import { useSelector, useDispatch} from 'react-redux';
import { useAlert } from 'react-alert';

import "./Home.css";
import ProductCard from './ProductCard.js';
import MetaData from '../layout/MetaData';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';


const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {
    loading, 
    error, 
    products, 
  } = useSelector(state => state.products);
  useEffect(() =>{
    if (error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  },[dispatch,error,alert])
  return (
    <Fragment>
    <MetaData title="ECOMMERCE" />
    <div className='banner'>
          <p>Welcome to Ecommerce</p>
          <h1>FIND AMAZING PRODUCTS BELOW</h1>
          <a href='#container'>
              <button>
                  Scroll <CgMouse />
              </button>
          </a>
    </div>
    <h2 className='homeHeading'>Featured Products</h2>
    {loading ? <Loader/> : (
        <div className="container" id="container">
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
        ))}
    </div>
    )}
    </Fragment>
  );
}

export default Home;