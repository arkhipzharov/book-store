export function filterProductsDataByInputs(
  productsDataToFilter,
  { inputsData },
) {
  const inputDataEntries = Object.entries(inputsData);
  const inputDataEntriesFiltered = inputDataEntries.filter((entry) => entry[1]);
  const filterFunctions = inputDataEntriesFiltered.map(([name, value]) => {
    const inputNameForCaseInsensitiveSearch = name.toLowerCase();
    const isMin = inputNameForCaseInsensitiveSearch.includes('min');
    const isMax = inputNameForCaseInsensitiveSearch.includes('max');
    return (data) => {
      let compareCondition;
      let valueFinal = value;
      if (isMin || isMax) {
        valueFinal = +value;
        const regExp = new RegExp(isMin ? 'min' : 'max', 'i');
        const dataKey = name.slice(name.search(regExp) + 3).toLowerCase();
        const dataValue = data[dataKey];
        compareCondition = isMin
          ? dataValue >= valueFinal
          : dataValue <= valueFinal;
      } else {
        compareCondition = data[name] === valueFinal;
      }
      return valueFinal && compareCondition;
    };
  }, []);
  return productsDataToFilter.filter((data) => {
    return filterFunctions.every((fun) => fun(data));
  });
}
