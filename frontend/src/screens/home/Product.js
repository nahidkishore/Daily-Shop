import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from '../../components/home/Nav';
import { FiChevronRight } from "react-icons/fi";
import { useGetProductQuery } from '../../store/services/productService';
import DetailsCard from '../../components/home/DetailsCard';
import ProductLoader from '../../components/home/ProductLoader';
const Product = () => {
  const { name } = useParams();
  const { data, isFetching } = useGetProductQuery(name);
  console.log(data, isFetching);
  return (
    <>
      <Nav />
     
      <div className='my-container mt-40'>
        {isFetching ? <ProductLoader/> : <>
        
        <ul className="flex items-center">
          <li className="capitalize text-gray-600">
            <Link to='/'>Home</Link>
          </li>
          <FiChevronRight className="block mx-2" />
      
          <li className="capitalize text-gray-600"  >  
          <Link to={`/cat-products/${data.category}`}>
                  {data.category}
                </Link>
          </li>
            <FiChevronRight className="block mx-2" />
            <li className="capitalize text-gray-600">
                <Link to={`/product/${data._id}`}>{data.title}</Link>
              </li>
          </ul>
          
          <DetailsCard product={data}/>
        </>}
      </div> 
    </>
  );
};

export default Product;