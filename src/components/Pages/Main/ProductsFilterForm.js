import { useState, memo, useMemo, createRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { ReactStarRatingComponent } from '@/components/libs-custom';
import { Icon } from '@/components/Icon';
import { ProductData } from '@/js/types/ProductData';
import { CHANGE } from '@/js/reducers/productsDataLoad';
import { PriceRangeField } from './PriceRangeField';
import { SearchWithSuggestFields } from './SearchWithSuggestFields';

const BASE_INPUTS_DATA_AND_STATE = {
  name: {
    isSearchWithSuggest: true,
    value: '',
  },
  author: {
    isSearchWithSuggest: true,
    value: '',
  },
  category: {
    isSearchWithSuggest: true,
    value: '',
  },
  currMinPrice: '',
  currMaxPrice: '',
  rating: 0,
};

// export named function when using memo to see component name in react devtools
// https://github.com/react-spring/react-three-fiber/issues/534#issuecomment-654138302
export const ProductsFilterForm = memo(function ProductsFilterForm({
  productsData,
  isLoaded,
  className,
  dispatchProductsDataLoad,
}) {
  const searchWithSuggestInputNames = Object.keys(
    BASE_INPUTS_DATA_AND_STATE,
  ).filter((key) => BASE_INPUTS_DATA_AND_STATE[key].isSearchWithSuggest);
  const searchWithSuggestInputRefs = useMemo(
    () => searchWithSuggestInputNames.map(() => createRef()),
    [],
  );
  const baseInputsState = Object.fromEntries(
    Object.entries(BASE_INPUTS_DATA_AND_STATE).map(([key, dataOrValue]) => {
      return [
        key,
        dataOrValue.value === undefined ? dataOrValue : dataOrValue.value,
      ];
    }),
  );
  const { handleSubmit, control, reset, watch, register, setValue } = useForm(
    baseInputsState,
  );
  const inputsState = watch();
  const [minAndMaxRangePrices, setMinAndMaxRangePrices] = useState({
    min: baseInputsState.currMinPrice,
    max: baseInputsState.currMaxPrice,
  });
  const onSubmit = (inputsData) => {
    const searchWithSuggestValidValueInputRefs = searchWithSuggestInputRefs.filter(
      (ref) => ref.current.getInput().value,
    );
    const searchWithSuggestInputDataEntriesValid = Object.entries(
      inputsData,
    ).filter(([name, value]) => {
      return (
        searchWithSuggestInputNames.some((inputName) => inputName === name) &&
        value
      );
    });
    if (
      searchWithSuggestValidValueInputRefs.length >
      searchWithSuggestInputDataEntriesValid.length
    ) {
      const searchWithSuggestInvalidValueInputRefs = searchWithSuggestInputRefs.filter(
        (ref) => {
          return !searchWithSuggestInputDataEntriesValid.some((entry) => {
            return ref.current.getInput().value === entry[1];
          });
        },
      );
      searchWithSuggestInvalidValueInputRefs.forEach((ref) => {
        ref.current.clear();
      });
    }
    dispatchProductsDataLoad({
      type: CHANGE,
      payload: {
        inputsData,
        kindOf: 'filter',
      },
    });
  };
  return (
    <div className={className}>
      <h4 className="mb-3">Filter</h4>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SearchWithSuggestFields
          control={control}
          productsData={productsData}
          searchWithSuggestInputNames={searchWithSuggestInputNames}
          searchWithSuggestInputRefs={searchWithSuggestInputRefs}
        />
        <PriceRangeField
          className="mb-3"
          inputsState={inputsState}
          isLoaded={isLoaded}
          minAndMaxRangePrices={minAndMaxRangePrices}
          productsData={productsData}
          register={register}
          reset={reset}
          setMinAndMaxRangePrices={setMinAndMaxRangePrices}
        />
        <Form.Group className="d-flex flex-column align-items-start">
          <Form.Label>Rating:</Form.Label>
          <div className="d-flex align-items-center">
            <Controller
              control={control}
              defaultValue={baseInputsState.rating}
              name="rating"
              render={({ value, onChange }) => (
                <ReactStarRatingComponent
                  className="ml-n1 mr-2"
                  renderStarIcon={(iconInd, currRating) => {
                    return (
                      <Icon
                        className="w-8 h-8 text-yellow"
                        href={`rating${iconInd > currRating ? '-border' : ''}`}
                      />
                    );
                  }}
                  value={+value}
                  onStarClick={onChange}
                />
              )}
            />
            <Button size="sm" onClick={() => setValue('rating', 0)}>
              Reset Rating
            </Button>
          </div>
        </Form.Group>
        <Button
          disabled={Object.values(inputsState).every((value) => !value)}
          type="submit"
          block
        >
          Apply Filters
        </Button>
      </Form>
    </div>
  );
});

ProductsFilterForm.propTypes = {
  className: PropTypes.string,
  dispatchProductsDataLoad: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  productsData: PropTypes.arrayOf(PropTypes.shape(ProductData)).isRequired,
};
