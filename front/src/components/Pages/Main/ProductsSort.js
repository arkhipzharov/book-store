import PropTypes from 'prop-types';
import _ from 'lodash';
import { CHANGE } from '@/js/reducers/productsDataLoad';
import { SortOptionToggle } from './SortOptionToggle';

const SORT_OPTION_TIPS_DATA = {
  name: 'A-Z',
};

export const ProductsSort = ({
  isSortOptionsToggledDataState,
  setIsSortOptionsToggledDataState,
  dispatchProductsDataLoad,
  BASE_IS_SORT_OPTIONS_TOGGLED_DATA_STATE,
  className = '',
}) => {
  const onSortOptionsToggleClick = (dataKeyToSortWith) => {
    const isSortOptionsToggledData =
      isSortOptionsToggledDataState[dataKeyToSortWith];
    setIsSortOptionsToggledDataState({
      ...BASE_IS_SORT_OPTIONS_TOGGLED_DATA_STATE,
      [dataKeyToSortWith]: {
        ...isSortOptionsToggledData,
        isToggled: !isSortOptionsToggledData.isToggled,
        isToggledOnce: true,
      },
    });
    dispatchProductsDataLoad({
      type: CHANGE,
      payload: {
        dataKeyToSortWith,
        kindOf: 'sort',
        isSortOptionsToggledDataState,
      },
    });
  };
  const getSortOptionTipTextByKey = (key) => {
    const matchingTipKey = Object.keys(SORT_OPTION_TIPS_DATA).find(
      (tipKey) => tipKey === key,
    );
    let tip = '';
    if (matchingTipKey) {
      tip = `(${SORT_OPTION_TIPS_DATA[matchingTipKey]})`;
    }
    return tip;
  };
  return (
    <div className={className}>
      <h4 className="mb-3">Sort</h4>
      <div className="mr-n2">
        {Object.entries(isSortOptionsToggledDataState).map(([key, value]) => (
          <SortOptionToggle
            key={key}
            className="mr-2"
            isCanNotToggleIncreaseDirection={value.isIncreaseDown !== undefined}
            isToggled={value.isToggled}
            isToggledOnce={value.isToggledOnce}
            onClick={() => {
              onSortOptionsToggleClick(key);
            }}
          >
            {`${_.upperFirst(key)} ${getSortOptionTipTextByKey(key)}`}
          </SortOptionToggle>
        ))}
      </div>
    </div>
  );
};

ProductsSort.propTypes = {
  BASE_IS_SORT_OPTIONS_TOGGLED_DATA_STATE: PropTypes.objectOf(
    PropTypes.shape({
      isToggled: PropTypes.bool.isRequired,
      isToggledOnce: PropTypes.bool.isRequired,
      isIncreaseDown: PropTypes.bool,
    }),
  ).isRequired,
  className: PropTypes.string,
  dispatchProductsDataLoad: PropTypes.func.isRequired,
  isSortOptionsToggledDataState: PropTypes.objectOf(
    PropTypes.shape({
      isToggled: PropTypes.bool.isRequired,
      isToggledOnce: PropTypes.bool.isRequired,
      isIncreaseDown: PropTypes.bool,
    }),
  ).isRequired,
  setIsSortOptionsToggledDataState: PropTypes.func.isRequired,
};
