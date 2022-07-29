import React from 'react';

import Header from '../../components/home/Header';
import Nav from '../../components/home/Nav';
import Skeleton from '../../components/Skeleton/Skeleton';
import Thumbnail from '../../components/Skeleton/Thumbnail';
import { useCatProductsQuery } from '../../store/services/homeProducts';
import Text from '../../components/Skeleton/Text';

import ProductCard from '../../components/home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from '../../components/Pagination';
const CatProducts = () => {
  const { name, page = 1 } = useParams();
  console.log(page);
  const { data, isFetching } = useCatProductsQuery({
    name,
    page: parseInt(page),
  });
  console.log(data, isFetching);
  return (
    <>
      <Nav />
      <div className='mt-[91px]'>
        <Header>#{name}</Header>
      </div>
      <div className='my-container my-10'>
        {isFetching ? (
          <div className='flex flex-wrap -mx-4 mb-10'>
            {[1, 2, 3, 4].map((item) => (
              <div
                className='w-6/12 sm:w-4/12 md:w-3/12 lg:w-4/12 xl:w-3/12 p-4'
                key={item}
              >
                <Skeleton>
                  <Thumbnail />
                  <Text mt='10px' />
                  <Text mt='10px' />
                </Skeleton>
              </div>
            ))}
          </div>
        ) : data.count > 0 ? (
          <>
            <p className='text-base font-medium text-gray-700 mx-5'>
              <span className='heading'>{data.count}</span> products found in{' '}
              <span className='heading'>#{name}</span> category
            </p>

            <div className='flex flex-wrap -mx-5'>
              {data.products.map((product) => {
                return <ProductCard product={product} />;
              })}
            </div>
            <Pagination
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
              path={`cat-products/${name}`}
              theme='light'
            />
          </>
        ) : (
          <p className='alert-danger'>No products found in #{name} category</p>
        )}
      </div>
    </>
  );
};

export default CatProducts;
