export function baseInputsStateFromDataAndState(BASE_INPUTS_DATA_AND_STATE) {
  return Object.fromEntries(
    Object.entries(BASE_INPUTS_DATA_AND_STATE).map(([key, dataOrValue]) => {
      return [
        key,
        dataOrValue.value === undefined ? dataOrValue : dataOrValue.value,
      ];
    }),
  );
}
