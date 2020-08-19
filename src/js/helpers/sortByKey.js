/*

*/

export function sortByKey(key, sortFun, customizeValueFun) {
  return (value1, value2) => {
    return sortFun(
      getFinalValue(value1, key, customizeValueFun),
      getFinalValue(value2, key, customizeValueFun),
    );
  };
}

function getFinalValue(data, key, customizeValueFun) {
  return customizeValueFun ? customizeValueFun(data[key]) : data[key];
}
