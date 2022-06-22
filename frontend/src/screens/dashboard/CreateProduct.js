import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from './Wrapper';
import ScreenHeader from '../../components/ScreenHeader';
import { useAllCategoriesQuery } from '../../store/services/categoryService';
import Spinner from '../../components/Spinner';
import { TwitterPicker } from 'react-color';
import { v4 as uuidv4 } from 'uuid';
import Colors from '../../components/Colors';
import SizesList from '../../components/SizesList';
import ImagePreview from '../../components/ImagePreview';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateProduct = () => {
  const { data = [], isFetching } = useAllCategoriesQuery();
  //console.log(data, isFetching);
  const [value, setValue] = useState('');
  const [state, setState] = useState({
    title: '',
    price: 0,
    discount: 0,
    stock: 0,
    category: '',
    colors: [],
    image1: '',
    image2: '',
    image3: '',
  });

  const [sizes] = useState([
    { name: 'xsm' },
    { name: 'sm' },
    { name: 'md' },
    { name: 'lg' },
    { name: 'xl' },
    { name: 'xxl' },
    { name: '1 years' },
    { name: '2 years' },
    { name: '3 years' },
    { name: '4 years' },
    { name: '5 years' },
  ]);
  const [sizeList, setSizeList] = useState([]);
  const [preview, setPreview] = useState({
    image1: '',
    image2: '',
    image3: '',
  });
  const handleImage = (e) => {
    /*   console.log(e.target.files) */
    if (e.target.files.length !== 0) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview({ ...preview, [e.target.name]: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
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
    const filtered = state.colors.filter((clr) => clr.color !== color.color);
    setState({ ...state, colors: filtered });
  };

  const chooseSize = (sizeObject) => {
    const filtered = sizeList.filter((size) => size.name !== sizeObject.name);
    setSizeList([...filtered, sizeObject]);
  };
  console.log(sizeList);
  const deleteSize = (name) => {
    const filtered = sizeList.filter((size) => size.name !== name);
    setSizeList(filtered);
  };
  console.log(preview);
  return (
    <Wrapper>
      <ScreenHeader>
        <Link to='/dashboard/products' className='btn-dark'>
          <i className='bi bi-arrow-left-short'></i> products list
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
              <TwitterPicker onChangeComplete={saveColors} />
            </div>
            <div className='w-full p-3'>
              <label htmlFor='sizes' className='label'>
                Choose sizes
              </label>
              {sizes.length > 0 && (
                <div className='flex flex-wrap -mx-3'>
                  {sizes.map((size) => (
                    <div
                      key={size.name}
                      className='size'
                      onClick={() => chooseSize(size)}
                    >
                      {size.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className='w-full p-3'>
              <label htmlFor='image1' className='label'>
                Image 1
              </label>
              <input
                type='file'
                name='image1'
                id='image1'
                className='input-file'
                onChange={handleImage}
              />
            </div>

            <div className='w-full p-3'>
              <label htmlFor='image2' className='label'>
                Image 2
              </label>
              <input
                type='file'
                name='image2'
                id='image2'
                className='input-file'
                onChange={handleImage}
              />
            </div>

            <div className='w-full p-3'>
              <label htmlFor='image3' className='label'>
                Image 3
              </label>
              <input
                type='file'
                name='image3'
                id='image3'
                className='input-file'
                onChange={handleImage}
              />
            </div>
            <div className='w-full p-3'>
              <label htmlFor='description' className='label'>
                Description
              </label>
              <ReactQuill
                theme='snow'
                id='description'
                value={value}
                onChange={setValue}
                placeholder='Description...'
              />
            </div>
            <div className='w-full p-3'>
              <input
                type='submit'
                value='save product'
                className='btn btn-indigo'
              />
            </div>
          </div>
        </div>
        <div className='w-full xl:w-4/12 p-3'>
          <Colors colors={state.colors} deleteColor={deleteColor} />
          <SizesList list={sizeList} deleteSize={deleteSize} />
          <ImagePreview url={preview.image1} heading='image 1' />
          <ImagePreview url={preview.image2} heading='image 2' />
          <ImagePreview url={preview.image3} heading='image 3' />
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateProduct;
