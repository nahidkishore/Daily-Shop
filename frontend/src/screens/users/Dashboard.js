import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import AccountList from '../../components/home/AccountList';
import Header from '../../components/home/Header';
import Nav from '../../components/home/Nav';
import { useVerifyPaymentQuery } from '../../store/services/paymentService';
import { emptyCart } from '../../store/reducers/cartReducer';

const Dashboard = () => {
  const { user } = useSelector((state) => state.authReducer);
  console.log(user);
  const [params] = useSearchParams();
  console.log(params.get('session_id'));
  const id = params.get('session_id');
  const { data, isSuccess } = useVerifyPaymentQuery(id, {
    skip: id ? false : true,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem('cart');
      toast.success(data.msg)
      dispatch(emptyCart());
      navigate('/user');
    }
  }, [isSuccess]);
  return (
    <>
      <Nav />
      <Toaster position="top-right" reverseOrder={false} />
      <div className='mt-[91px]'>
        <Header>My Profile</Header>
        <div className='my-container mt-[80px]'>
          <div className='flex flex-wrap -mx-6'>
            <div className='w-full md:w-4/12 p-6'>
              <AccountList />
            </div>
            <div>
              <div className='w-full md:w-8/12 p-6'>
                <h1 className='heading'>name</h1>
                <span className='block mt-3 capitalize font-medium text-sm'>
                  {user?.name}
                </span>
              </div>
              <div className='w-full md:w-8/12 p-6'>
                <h1 className='heading'>Email</h1>
                <span className='block mt-3 capitalize font-medium text-sm'>
                  {user?.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
