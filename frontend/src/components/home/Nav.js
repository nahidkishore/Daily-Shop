import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { BsHandbag } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

import Search from './Search';
import { toggleSearchBar } from '../../store/reducers/globalReducer';

const Nav = () => {
  const { userToken, user } = useSelector((state) => state.authReducer);
  const { searchBar } = useSelector((state) => state.globalReducer);
  const { items, total } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  return (
    <>
      <nav className='nav'>
        <div className='my-container'>
          <div className='flex justify-between items-center'>
            <Link to='/'>
              <img
                src='/daily-shop.jpg'
                alt='logo'
                className='h-full object-cover max-h-16 max-w-70'
              />
            </Link>
            <ul className='flex items-center'>
              <li className='nav-li cursor-pointer'>
                <FiSearch
                  size={22}
                  onClick={() => dispatch(toggleSearchBar())}
                />
              </li>
              {userToken ? (
                <li className='nav-li'>
                  <Link to='/user' className='nav-link'>
                    {user?.name}
                  </Link>
                </li>
              ) : (
                <li className='nav-li'>
                  <Link to='/login' className='nav-link'>
                    Sign in
                  </Link>
                </li>
              )}
              <li className='nav-li relative'>
                <Link to='/cart'>
                  <BsHandbag size={20} />
                  <span className='nav-circle'>{items}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Search />
    </>
  );
};

export default Nav;
