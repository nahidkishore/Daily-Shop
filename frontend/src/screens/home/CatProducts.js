import React from 'react';
import Header from '../../components/home/Header';
import Nav from '../../components/home/Nav';
import { useCatProductsQuery } from '../../store/services/homeProducts';
import ProductCard from '../../components/home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import ProductSkeleton from '../../components/home/ProductSkeleton';
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
          <ProductSkeleton />
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
