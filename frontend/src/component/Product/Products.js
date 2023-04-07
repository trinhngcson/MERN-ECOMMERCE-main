import React, { Fragment, useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import './Products.css';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../../component/Home/ProductCard.js';
import { getProduct,clearErrors } from '../../actions/productAction';
import MetaData from '../layout/MetaData';


const Products = () => {
    
    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ]
    const dispatch = useDispatch();
    const [currentPage,setCurrentPage] = useState(1);
    const [price,setPrice] = useState([0,25000]);
    const [category,setCategory] = useState("");
    const {keyword} = useParams();
    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    } = useSelector((state) => state.products);
    const [ratings, setRatings] = useState(0);
    const alert = useAlert();
    let count = filteredProductsCount;

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword,currentPage,price,category,ratings));
    }, [dispatch,keyword,currentPage,price,category,ratings,alert,error]);
    
    
   
  return (
    <Fragment>
        <MetaData title = "PRODUCTS"/>
        <h2 className="productsHeading">Products</h2>
        <div className="filterBox">
                <Typography>Price</Typography>
                    <Slider 
                        value = {price}
                        onChange = {priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby='range-slider'
                        min = {0}
                        max = {25000}
                />
                <Typography>Categories</Typography>
                <ul className="categoryBox">
                    {categories.map((category)=>(
                        <li
                            className='category-link'
                            key={category}
                            onClick = {() => setCategory(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
                <fieldset>
                    <Typography 
                        component="legend"
                    >Ratings Above</Typography>
                    <Slider
                        value = {ratings}
                        onChange = {(e, newRating) => {
                            setRatings(newRating);
                        }}
                        aria-labelledby = "continuous-slider"
                        min={0}
                        max={5}
                        valueLabelDisplay="auto"
                    >
                    </Slider>
                </fieldset>
            </div>
        {loading ? <Loader /> : (
            <Fragment>      
                <div className="products">
                {products && products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
                </div>
                {resultPerPage < count && (
                    <div className="paginationBox">
                        <Pagination 
                            activePage = {currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText=">"
                            prevPageText="<"
                            firstPageText="<<"
                            lastPageText=">>"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"
                        />
                    </div>
                )}      
            </Fragment>
        )}
    </Fragment>
  )
}

export default Products;