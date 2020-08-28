import * as h from '@front/utils/helpers';

export const LOADED = 'LOADED';
export const CHANGE = 'CHANGE';

export const productsDataLoadReducerBaseState = {
  productsDataBase: [],
  productsData: [],
  isLoaded: false,
  productsDataInvalidKindOfChange: '',
};

const productsDataChangeFunctions = {
  sort: h.sortProductsData,
  filter: h.filterProductsDataByInputs,
};

export function productsDataLoadReducer(state, action) {
  switch (action.type) {
    case LOADED: {
      const { productsData } = action.payload;
      return {
        ...state,
        productsDataBase: productsData,
        productsData: h.sortProductsData(productsData, action.payload),
        isLoaded: true,
      };
    }
    case CHANGE: {
      const { kindOf } = action.payload;
      const { productsData, productsDataBase } = state;
      const productsDataChanged = productsDataChangeFunctions[kindOf](
        kindOf === 'sort' ? productsData : productsDataBase,
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
}
