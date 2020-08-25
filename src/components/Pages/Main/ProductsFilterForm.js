import { useState, memo, useMemo, createRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { ReactStarRatingComponent } from '@/components/libs-custom';
import { Icon } from '@/components/Icon';
import { ProductData } from '@/js/types/ProductData';
import { CHANGE } from '@/js/reducers/productsDataLoad';
import * as h from '@/js/helpers';
import { PriceRangeField } from './PriceRangeField';
import { SearchWithSuggestField } from './SearchWithSuggestField';
import { RatingField } from './RatingField';

const BASE_INPUTS_DATA_AND_STATE = {
  name: {
    isSearchWithSuggest: true,
    placeholder: 'abc',
    value: '',
  },
  author: {
    isSearchWithSuggest: true,
    placeholder: 'George Orwell',
    value: '',
  },
  category: {
    isSearchWithSuggest: true,
    placeholder: 'dystopia',
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
  className = '',
  dispatchProductsDataLoad,
}) {
  const searchWithSuggestInputDataEntries = Object.entries(
    BASE_INPUTS_DATA_AND_STATE,
  ).filter((entry) => entry[1].isSearchWithSuggest);
  const searchWithSuggestInputRefs = useMemo(
    () => searchWithSuggestInputDataEntries.map(() => createRef()),
    [],
  );
  const baseInputsState = h.baseInputsStateFromDataAndState(
    BASE_INPUTS_DATA_AND_STATE,
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
    const searchWithSuggestInputDataEntriesValid = searchWithSuggestInputDataEntries.filter(
      ([name, value]) => {
        return (
          searchWithSuggestInputDataEntries.some(
            ([inputName]) => inputName === name,
          ) && value
        );
      },
    );
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
        {searchWithSuggestInputDataEntries.map(([name], i) => (
          <SearchWithSuggestField
            key={name}
            ref={searchWithSuggestInputRefs[i]}
            control={control}
            inputName={name}
            productsData={productsData}
          />
        ))}
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
        <RatingField
          baseInputsState={baseInputsState}
          className="mb-3"
          control={control}
          setValue={setValue}
        />
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
