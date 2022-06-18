import React from 'react';
import { Link } from 'react-router-dom';
import Wrapper from './Wrapper';
import ScreenHeader from '../../components/ScreenHeader';
import { useAllCategoriesQuery } from '../../store/services/categoryService';
import Spinner from '../../components/Spinner';
const CreateProduct = () => {
  const { data = [], isFetching } = useAllCategoriesQuery();
  console.log(data, isFetching);
  return (
    <Wrapper>
      <ScreenHeader>
        <Link to='/dashboard/products' className='btn-dark'>
          <i className='bi bi-arrow-left-short'></i> proudcts list
        </Link>
      </ScreenHeader>
      <div className='flex flex-wrap mx-3'>
        <div className='w-full xl:w-8/12 p-3'>
          <div className='flex flex-wrap'>
            <div className='w-full md:w-6/12 p-3'>
              <label htmlFor='title' className='label'>
                Title
              </label>
              <input
                type='text'
                name='title'
                className='form-control'
                id='title'
                placeholder='title...'
              />
            </div>
            <div className='w-full md:w-6/12 p-3'>
              <label htmlFor='price' className='label'>
                Price
              </label>
              <input
                type='number'
                name='price'
                className='form-control'
                id='price'
                placeholder='price...'
              />
            </div>
            <div className='w-full md:w-6/12 p-3'>
              <label htmlFor='discount' className='label'>
                Discount
              </label>
              <input
                type='number'
                name='discount'
                className='form-control'
                id='discount'
                placeholder='discount...'
              />
            </div>
            <div className='w-full md:w-6/12 p-3'>
              <label htmlFor='stock' className='label'>
                Stock
              </label>
              <input
                type='number'
                name='stock'
                className='form-control'
                id='stock'
                placeholder='stock...'
              />
            </div>
            <div className='w-full md:w-6/12 p-3'>
              <label htmlFor='categories' className='label'>
                Categories
              </label>
              {!isFetching ? (
                data?.categories?.length > 0 && (
                  <select name='categories' id='categories' className='form-control'>
                    <option value=''>Choose Category</option>
                    {data?.categories?.map((category) => (
                      <option value={category.name} key={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
        <div className='w-full xl:w-4/12 p-3'>colors and images</div>
      </div>
    </Wrapper>
  );
};

export default CreateProduct;
