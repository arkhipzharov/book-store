import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '@/js/helpers';
import { SortOptionToggle } from './SortOptionToggle';

const sortOptionTipsData = {
  name: 'A-Z',
};

export const ProductsSort = ({
  isSortOptionsToggledDataState,
  onSortOptionsToggleClick,
  className,
}) => {
  const getSortOptionTipTextByKey = (key) => {
    const matchingTipKey = Object.keys(sortOptionTipsData).find(
      (tipKey) => tipKey === key,
    );
    let tip = '';
    if (matchingTipKey) {
      tip = `(${sortOptionTipsData[matchingTipKey]})`;
    }
    return tip;
  };
  return (
    <div className={className}>
      <span className="mb-2 d-block">Sort by:</span>
      <div className="mr-n2">
        {Object.entries(isSortOptionsToggledDataState).map(([key, value]) => (
          <SortOptionToggle
            key={key}
            isToggled={value.isToggled}
            isToggledOnce={value.isToggledOnce}
            isNotHaveIncreaseDirection={value.isNotHaveIncreaseDirection}
            className="mr-2"
            onClick={() => {
              onSortOptionsToggleClick(key);
            }}
          >
            {`${capitalizeFirstLetter(key)} ${getSortOptionTipTextByKey(key)}`}
          </SortOptionToggle>
        ))}
      </div>
    </div>
  );
};

ProductsSort.propTypes = {
  className: PropTypes.string,
  onSortOptionsToggleClick: PropTypes.func.isRequired,
  isSortOptionsToggledDataState: PropTypes.objectOf(
    PropTypes.shape({
      isToggled: PropTypes.bool.isRequired,
      isToggledOnce: PropTypes.bool.isRequired,
      isNotHaveIncreaseDirection: PropTypes.bool,
    }),
  ),
};
