import { CardColumns } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { delay } from '@/js/helpers';
import styled from 'styled-components';
import { Product } from './Product';

const productsDataFake = [
  {
    name: '1984',
    description: `
      Description Lorem ipsum dolor sit, amet consectetur adipisicing elit
    `,
    price: 9999,
    rating: 4,
    cover_img_url: 'https://google.com',
    example_text: `
      Example text Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Iste nobis labore soluta?
    `,
    author: 'George Orwell',
    reviews: [
      {
        username: 'David',
        rating: 4,
        text: 'good',
      },
    ],
  },
];

export const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const loadData = async () => {
    await delay(0);
    setProductsData(
      productsDataFake.concat(new Array(11).fill(productsDataFake).flat()),
    );
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <StyledCardColumns>
      {productsData.map((data, i) => (
        <Product key={i} data={data} />
      ))}
    </StyledCardColumns>
  );
};

const StyledCardColumns = styled(CardColumns)`
  @media (min-width: 576px) {
    column-count: 1;
  }

  @media (min-width: 768px) {
    column-count: 2;
  }

  @media (min-width: 992px) {
    column-count: 3;
  }
`;
