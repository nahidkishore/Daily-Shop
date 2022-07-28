import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/home/Header';
import Nav from '../../components/home/Nav';
import { useCatProductsQuery } from '../../store/services/homeProducts';

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
      <Header>#{name}</Header>
    </>
  );
};

export default CatProducts;
