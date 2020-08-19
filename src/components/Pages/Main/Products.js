import { CardColumns } from 'react-bootstrap';
import { useEffect, useState, useReducer } from 'react';
import { delay, sortByKey } from '@/js/helpers';
import styled from 'styled-components';
import { Product } from './Product';
import { ProductsFilterForm } from './ProductsFilterForm';
import { ProductsSort } from './ProductsSort';

const productsDataFake = [
  {
    name: 'a',
    category: 'dystopia',
    description: `
      Description Lorem ipsum dolor sit, amet consectetur adipisicing elit
    `,
    price: 4,
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
  {
    name: 'c',
    category: 'comedy',
    description: `
      Description Lorem ipsum dolor sit, amet consectetur adipisicing elit
    `,
    price: 1,
    rating: 5,
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
  {
    name: 'b',
    category: 'drama',
    description: `
      Description Lorem ipsum dolor sit, amet consectetur adipisicing elit
    `,
    price: 8,
    rating: 2,
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

const sortFunctionsData = {
  increaseDown: (value1, value2) => value1 - value2,
  increaseUp: (value1, value2) => value2 - value1,
  name: (value1, value2) => {
    if (value1 < value2) {
      return -1;
    }
    if (value1 > value2) {
      return 1;
    }
    return 0;
  },
};

export const Products = () => {
  const baseIsSortOptionsToggledDataState = {
    rating: {
      isToggled: false,
      isToggledOnce: false,
    },
    price: {
      isToggled: false,
      isToggledOnce: false,
    },
    name: {
      isToggled: false,
      isToggledOnce: false,
      isNotHaveIncreaseDirection: true,
    },
  };
  const [
    isSortOptionsToggledDataState,
    setIsSortOptionsToggledDataState,
  ] = useState(baseIsSortOptionsToggledDataState);
  const sortProductsData = (productsDataToSort, dataKeyToSortWith) => {
    const sortFun = sortFunctionsData[dataKeyToSortWith];
    let sortFunFinal;
    if (sortFun) {
      sortFunFinal = sortFun;
    } else {
      const { increaseDown, increaseUp } = sortFunctionsData;
      if (isSortOptionsToggledDataState[dataKeyToSortWith].isToggled) {
        sortFunFinal = increaseDown;
      } else {
        sortFunFinal = increaseUp;
      }
    }
    return productsDataToSort.sort(sortByKey(dataKeyToSortWith, sortFunFinal));
  };
  const [{ isLoaded, productsData }, dispatchProductsDataLoad] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'LOADED':
          return {
            productsData: sortProductsData(
              action.payload.productsData,
              'price',
            ),
            isLoaded: true,
          };
        case 'SORT':
          return {
            ...state,
            productsData: sortProductsData(
              state.productsData,
              action.payload.sortOptionName,
            ),
          };
        default:
          throw new Error();
      }
    },
    { productsData: [], isLoaded: false },
  );
  const onSortOptionsToggleClick = (dataKeyToSortWith) => {
    const isSortOptionsToggledData =
      isSortOptionsToggledDataState[dataKeyToSortWith];
    setIsSortOptionsToggledDataState({
      ...baseIsSortOptionsToggledDataState,
      [dataKeyToSortWith]: {
        ...isSortOptionsToggledData,
        isToggled: !isSortOptionsToggledData.isToggled,
        isToggledOnce: true,
      },
    });
    dispatchProductsDataLoad({
      type: 'SORT',
      payload: {
        sortOptionName: dataKeyToSortWith,
      },
    });
    // sortProductsData(dataKeyToSortWith);
  };
  const loadProductsData = async () => {
    await delay(1000);
    dispatchProductsDataLoad({
      type: 'LOADED',
      payload: {
        productsData: productsDataFake,
      },
    });
  };
  useEffect(() => {
    loadProductsData();
  }, []);
  return (
    <>
      <h4 className="mb-3">Filter</h4>
      <ProductsFilterForm
        productsData={productsData}
        isLoaded={isLoaded}
        className="mb-3"
      />
      <ProductsSort
        isSortOptionsToggledDataState={isSortOptionsToggledDataState}
        className="mb-3"
        onSortOptionsToggleClick={onSortOptionsToggleClick}
      />
      <StyledCardColumns>
        {productsData.map((data) => (
          <Product key={data.name} data={data} />
        ))}
      </StyledCardColumns>
    </>
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
