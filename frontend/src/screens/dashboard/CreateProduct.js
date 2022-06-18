import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from './Wrapper';
import ScreenHeader from '../../components/ScreenHeader';
import { useAllCategoriesQuery } from '../../store/services/categoryService';
import Spinner from '../../components/Spinner';
import { TwitterPicker } from 'react-color';
import { v4 as uuidv4 } from 'uuid';
import Colors from '../../components/Colors';

const CreateProduct = () => {
  const { data = [], isFetching } = useAllCategoriesQuery();
  console.log(data, isFetching);
  const [state, setState] = useState({
    title: '',
    price: 0,
    discount: 0,
    stock: 0,
    category: '',
    colors: [],
  });
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const saveColors = (color) => {
    console.log(color);
    const filtered = state.colors.filter((clr) => clr.color !== color.hex);
    setState({
      ...state,
      colors: [...filtered, { color: color.hex, id: uuidv4() }],
    });
  };
 // console.log(state.colors);
  const deleteColor = (color) => {
    const filtered = state.colors.filter(clr => clr.color !== color.color);
    setState({...state, colors: filtered});
}
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
                onChange={handleInput}
                value={state.title}
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
                onChange={handleInput}
                value={state.price}
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
                onChange={handleInput}
                value={state.discount}
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
                onChange={handleInput}
                value={state.stock}
              />
            </div>
            <div className='w-full md:w-6/12 p-3'>
              <label htmlFor='categories' className='label'>
                Categories
              </label>
              {!isFetching ? (
                data?.categories?.length > 0 && (
                  <select
                    name='category'
                    id='categories'
                    className='form-control'
                    onChange={handleInput}
                    value={state.category}
                  >
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
            <div className='w-full md:w-6/12 p-3'>
              <label htmlFor='colors' className='label'>
                Choose colors
              </label>
              <label htmlFor=''>
                <TwitterPicker onChangeComplete={saveColors} />
              </label>
            </div>
          </div>
        </div>
        <div className='w-full xl:w-4/12 p-3'>
          <Colors colors={state.colors} deleteColor={ deleteColor}/>
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateProduct;
