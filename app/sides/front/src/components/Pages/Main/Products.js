import { useEffect, useState, useReducer } from 'react';
import {
  STARTUP_SORT_PRODUCTS_BY_DATA_KEY,
  PRODUCTS_DATA_FAKE,
} from '@front/utils/constants';
import {
  LOADED,
  productsDataLoadReducer,
  productsDataLoadReducerBaseState,
} from '@front/js/reducers/productsDataLoad';
import * as h from '@/utils/helpers';
import { ProductsFilterForm } from './ProductsFilterForm';
import { ProductsSort } from './ProductsSort';
import { ProductsGridWithValidation } from './ProductsGridWithValidation';

const BASE_IS_SORT_OPTIONS_TOGGLED_DATA_STATE = {
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

export const Products = () => {
  const [
    isSortOptionsToggledDataState,
    setIsSortOptionsToggledDataState,
  ] = useState(BASE_IS_SORT_OPTIONS_TOGGLED_DATA_STATE);
  const [productsDataLoadState, dispatchProductsDataLoad] = useReducer(
    productsDataLoadReducer,
    productsDataLoadReducerBaseState,
  );
  const {
    productsDataBase,
    productsData,
    isLoaded,
    productsDataInvalidKindOfChange,
  } = productsDataLoadState;
  const loadProductsData = async () => {
    await h.delay(0);
    dispatchProductsDataLoad({
      type: LOADED,
      payload: {
        productsData: PRODUCTS_DATA_FAKE,
        dataKeyToSortWith: STARTUP_SORT_PRODUCTS_BY_DATA_KEY,
        isSortOptionsToggledDataState,
      },
    });
  };
  useEffect(() => {
    loadProductsData();
  }, []);
  return (
    <>
      <ProductsFilterForm
        className="mb-3"
        dispatchProductsDataLoad={dispatchProductsDataLoad}
        isLoaded={isLoaded}
        productsData={productsDataBase}
      />
      <ProductsSort
        BASE_IS_SORT_OPTIONS_TOGGLED_DATA_STATE={
          BASE_IS_SORT_OPTIONS_TOGGLED_DATA_STATE
        }
        className="mb-4"
        dispatchProductsDataLoad={dispatchProductsDataLoad}
        isSortOptionsToggledDataState={isSortOptionsToggledDataState}
        setIsSortOptionsToggledDataState={setIsSortOptionsToggledDataState}
      />
      <ProductsGridWithValidation
        productsData={productsData}
        productsDataInvalidKindOfChange={productsDataInvalidKindOfChange}
      />
    </>
  );
};
