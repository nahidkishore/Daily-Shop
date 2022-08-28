import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../../components/home/Nav';
import currency from 'currency-formatter';
import { motion } from 'framer-motion';
import { discount } from '../../utils/discount';
import { BsTrash } from 'react-icons/bs';
import Quantity from '../../components/home/Quantity';
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from '../../store/reducers/cartReducer';
import { Link } from 'react-router-dom';
const CartScreenPage = () => {
  const { cart, total } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const inc = (id) => {
    dispatch(incrementQuantity(id));
  };

  const dec = (id) => {
    dispatch(decrementQuantity(id));
  };
  const remove = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(removeItem(id));
    }
  };
  return (
    <>
      <Nav />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='my-container mt-28'
      >
        {cart.length > 0 ? (
          <>
            <div className='table-container'>
              <table className='w-full'>
                <thead>
                  <tr className='thead-tr'>
                    <th className='th'>image</th>
                    <th className='th'>name</th>
                    <th className='th'>color</th>
                    <th className='th'>size</th>
                    <th className='th'>price</th>
                    <th className='th'>quantities</th>
                    <th className='th'>total</th>
                    <th className='th'>delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const total = currency.format(
                      discount(item.price, item.discount) * item.quantity,
                      {
                        code: 'USD',
                      }
                    );
                    return (
                      <tr className='even:bg-gray-50' key={item._id}>
                        <td className='td'>
                          <img
                            src={`/images/${item.image1}`}
                            alt={item.title}
                            className='w-12 h-12 object-cover rounded-full'
                          />
                        </td>
                        <td className='td font-medium'>{item.title}</td>
                        <td className='td'>
                          <span
                            className='block w-[15px] h-[15px] rounded-full'
                            style={{ backgroundColor: item.color }}
                          ></span>
                        </td>

                        <td className='td'>
                          <span className='font-semibold'>{item.size}</span>
                        </td>
                        <td className='td font-bold text-gray-900'>
                          {currency.format(
                            discount(item.price, item.discount),
                            {
                              code: 'USD',
                            }
                          )}
                        </td>
                        <td className='td'>
                          <Quantity
                            quantity={item.quantity}
                            inc={() => inc(item._id)}
                            dec={() => dec(item._id)}
                            theme='indigo'
                          />
                        </td>
                        <td className='td font-bold '>{total}</td>
                        <td>
                          <span
                            className='cursor-pointer'
                            onClick={() => remove(item._id)}
                          >
                            <BsTrash className='text-rose-600' size={20} />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className='bg-indigo-50 p-4 flex justify-end mt-5 rounded-md'>
              <div>
                <span className='text-lg font-semibold text-indigo-800 mr-10'>
                  {currency.format(total, { code: 'USD' })}
                </span>
                <Link
                  to='/'
                  className='btn bg-indigo-600 text-sm font-medium py-2.5'
                >
                  checkout
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className='bg-indigo-50 border border-indigo-100 p-4 rounded-md text-sm font-medium text-indigo-800'>
            Cart is empty!
          </div>
        )}
      </motion.div>
    </>
  );
};

export default CartScreenPage;
