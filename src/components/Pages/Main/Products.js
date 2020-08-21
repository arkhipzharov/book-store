import { useEffect, useState, useReducer } from 'react';
import { delay } from '@/js/helpers';
import { STARTUP_SORT_PRODUCTS_BY_DATA_KEY } from '@/js/constants';
import _ from 'lodash';
import { ProductsFilterForm } from './ProductsFilterForm';
import { ProductsSort } from './ProductsSort';
import { ProductsGrid } from './ProductsGrid';

const productsDataFake = [
  {
    name: 'a',
    category: 'dystopia',
    description: `
      Description dystopia ipsum dolor sit, amet consectetur adipisicing elit
    `,
    price: 4,
    rating: 4,
    cover_img_url: 'https://google.com',
    example_text: `
      Example text dystopia ipsum dolor sit amet consectetur adipisicing elit.
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
      Description comedy ipsum dolor sit, amet consectetur adipisicing elit
    `,
    price: 1,
    rating: 5,
    cover_img_url: 'https://google.com',
    example_text: `
      Example text comedy ipsum dolor sit amet consectetur adipisicing elit.
      Iste nobis labore soluta?
    `,
    author: 'Aldous Huxley',
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
      Description drama ipsum dolor sit, amet consectetur adipisicing elit
    `,
    price: 8,
    rating: 2,
    cover_img_url: 'https://google.com',
    example_text: `
      Example text drama ipsum dolor sit amet consectetur adipisicing elit.
      Iste nobis labore soluta?
    `,
    author: 'Alexander Pushkin',
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
      isIncreaseDown: true,
    },
  };
  const [
    isSortOptionsToggledDataState,
    setIsSortOptionsToggledDataState,
  ] = useState(baseIsSortOptionsToggledDataState);
  const sortProductsData = (productsDataToSort, { dataKeyToSortWith }) => {
    const { isToggled, isIncreaseDown } = isSortOptionsToggledDataState[
      dataKeyToSortWith
    ];
    let sortDirection;
    if (isIncreaseDown === undefined) {
      sortDirection = isToggled ? 'asc' : 'desc';
    } else {
      sortDirection = isIncreaseDown ? 'asc' : 'desc';
    }
    return _.orderBy(
      productsDataToSort,
      [(data) => data[dataKeyToSortWith]],
      [sortDirection],
    );
  };
  const filterProductsDataByInputs = (
    productsDataToFilter,
    { filterInputsData },
  ) => {
    const inputDataEntries = Object.entries(filterInputsData);
    const inputDataEntriesFiltered = inputDataEntries.filter(
      (entry) => entry[1],
    );
    const filterFunctions = inputDataEntriesFiltered.map(([name, value]) => {
      const valueNum = +value;
      const inputNameForCaseInsensitiveSearch = name.toLowerCase();
      const isMin = inputNameForCaseInsensitiveSearch.includes('min');
      const isMax = inputNameForCaseInsensitiveSearch.includes('max');
      return (data) => {
        let compareCondition;
        if (isMin || isMax) {
          const regExp = new RegExp(isMin ? 'min' : 'max', 'i');
          const dataKey = name.slice(name.search(regExp) + 3).toLowerCase();
          const dataValue = data[dataKey];
          compareCondition = isMin
            ? dataValue >= valueNum
            : dataValue <= valueNum;
        } else {
          compareCondition = data[name] === valueNum;
        }
        return valueNum && compareCondition;
      };
    }, []);
    return productsDataToFilter.filter((data) => {
      return filterFunctions.every((fun) => fun(data));
    });
  };
  const productsDataChangeFunctions = {
    sort: sortProductsData,
    filter: filterProductsDataByInputs,
  };
  const [productsDataLoadState, dispatchProductsDataLoad] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'LOADED':
          return {
            ...state,
            productsData: sortProductsData(
              action.payload.productsData,
              action.payload,
            ),
            isLoaded: true,
          };
        case 'CHANGE': {
          const { kindOf } = action.payload;
          const productsDataChanged = productsDataChangeFunctions[kindOf](
            state.productsData,
            action.payload,
          );
          return {
            ...state,
            ...(productsDataChanged.length > 0
              ? {
                  productsData: productsDataChanged,
                  productsDataInvalidKindOfChange: '',
                }
              : { productsDataInvalidKindOfChange: kindOf }),
          };
        }
        default:
          throw new Error();
      }
    },
    { productsData: [], isLoaded: false, productsDataInvalidKindOfChange: '' },
  );
  const {
    productsData,
    isLoaded,
    productsDataInvalidKindOfChange,
  } = productsDataLoadState;
  const loadProductsData = async () => {
    await delay(1000);
    dispatchProductsDataLoad({
      type: 'LOADED',
      payload: {
        productsData: productsDataFake,
        dataKeyToSortWith: STARTUP_SORT_PRODUCTS_BY_DATA_KEY,
      },
    });
  };
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
      type: 'CHANGE',
      payload: {
        dataKeyToSortWith,
        kindOf: 'sort',
      },
    });
  };
  const onFilterFormSubmit = (filterInputsData) => {
    dispatchProductsDataLoad({
      type: 'CHANGE',
      payload: {
        filterInputsData,
        kindOf: 'filter',
      },
    });
  };
  useEffect(() => {
    loadProductsData();
  }, []);
  return (
    <>
      <ProductsFilterForm
        productsData={productsData}
        isLoaded={isLoaded}
        className="mb-3"
        onSubmit={onFilterFormSubmit}
      />
      <ProductsSort
        isSortOptionsToggledDataState={isSortOptionsToggledDataState}
        className="mb-4"
        onSortOptionsToggleClick={onSortOptionsToggleClick}
      />
      <ProductsGrid
        productsData={productsData}
        productsDataInvalidKindOfChange={productsDataInvalidKindOfChange}
      />
    </>
  );
};
