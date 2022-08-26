import React from 'react';
import Categories from '../../components/home/Categories';
import HomeProducts from '../../components/home/HomeProducts';
import Nav from '../../components/home/Nav';
import Slider from '../../components/home/Slider';
import { useRandomCategoriesQuery } from '../../store/services/categoryService';

const Home = () => {
  const { data, isFetching } = useRandomCategoriesQuery();
  console.log(data, isFetching);
  return (
  
      <>
      <Nav />
      <div className="mt-[70px]">
        <Slider/>
      </div>
      <div className="my-container mt-10">
        <Categories />
        {!isFetching &&
          data?.categories?.length > 0 &&
          data?.categories.map((category) => (
            <HomeProducts category={category} key={category._id} />
          ))}
      </div>
       
      </>
 
  );
};

export default Home;
