import _ from 'lodash';

export function sortProductsData(
  productsDataToSort,
  { isSortOptionsToggledDataState, dataKeyToSortWith },
) {
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
}
