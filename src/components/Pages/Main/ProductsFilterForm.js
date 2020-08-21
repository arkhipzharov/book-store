import { useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { findClosestNumber } from '@/js/helpers';
import { useForm, Controller } from 'react-hook-form';
import _ from 'lodash';
import { ReactStarRatingComponent } from '@/components/libs-custom';
import { Icon } from '@/components/Icon';
import { ProductData } from '@/js/types/ProductData';
import { ReactBootstrapSliderWrapper } from './ReactBootstrapSliderWrapper';

const baseInputsData = {
  name: {
    isSearchWithSuggestions: true,
    value: '',
  },
  author: {
    isSearchWithSuggestions: true,
    value: '',
  },
  category: {
    isSearchWithSuggestions: true,
    value: '',
  },
  currMinPrice: '',
  currMaxPrice: '',
  rating: 0,
};
const searchWithSuggestionsInputNames = ['name', 'author', 'category'];

// export named function when using memo to see component name in react devtools
// https://github.com/react-spring/react-three-fiber/issues/534#issuecomment-654138302
export const ProductsFilterForm = memo(function ProductsFilterForm({
  productsData,
  isLoaded,
  className,
  onSubmit,
}) {
  const baseInputsState = {
    rating: 0,
    name: '',
    author: '',
    category: '',
    currMinPrice: '',
    currMaxPrice: '',
  };
  const { handleSubmit, control, reset, watch, register } = useForm(
    baseInputsState,
  );
  const inputsState = watch();
  const [minAndMaxRangePrices, setMinAndMaxRangePrices] = useState({
    min: baseInputsState.currMinPrice,
    max: baseInputsState.currMaxPrice,
  });
  const isRenderedOnce = useRef(true);
  const getMinOrMaxPrice = (isMin) => {
    return Math[isMin ? 'min' : 'max'](
      ...productsData.map((data) => data.price),
    );
  };
  const onPriceInputsChange = (e) => {
    const { name, value } = e.target;
    const isEmptyInput = value === '';
    const price = +value;
    const { currMinPrice, currMaxPrice } = inputsState;
    const { min: minPrice, max: maxPrice } = minAndMaxRangePrices;
    const isPriceNumberValid = Number.isFinite(price);
    const isMin = name === 'currMinPrice';
    const isMinGreaterThanMax =
      currMaxPrice !== '' && isMin && price > +currMaxPrice;
    const isMaxLessThanMin =
      currMinPrice !== '' && !isMin && price < +currMinPrice;
    const isRangeInvalid = isMinGreaterThanMax || isMaxLessThanMin;
    const isStaticMinMaxRangeInvalid = price < minPrice || price > maxPrice;
    let newValue;
    if (isEmptyInput) {
      reset({
        ...inputsState,
        [name]: '',
      });
    } else {
      if (isRangeInvalid) {
        newValue = isMin ? +currMaxPrice : +currMinPrice;
      } else if (isStaticMinMaxRangeInvalid) {
        newValue = findClosestNumber(price, [minPrice, maxPrice]);
      } else {
        newValue = price;
      }
      reset({
        ...inputsState,
        ...(isPriceNumberValid ? { [name]: newValue } : {}),
      });
    }
  };
  const onPriceRangeChange = (e) => {
    const [currMinPrice, currMaxPrice] = e.target.value;
    reset({
      ...inputsState,
      currMinPrice,
      currMaxPrice,
    });
  };
  useEffect(() => {
    if (isRenderedOnce.current) {
      isRenderedOnce.current = false;
      return;
    }
    const currMinPrice = getMinOrMaxPrice(true);
    const currMaxPrice = getMinOrMaxPrice(false);
    setMinAndMaxRangePrices({
      min: currMinPrice,
      max: currMaxPrice,
    });
  }, [isLoaded]);
  return (
    <div className={className}>
      <h4 className="mb-3">Filter</h4>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {searchWithSuggestionsInputNames.map((name) => (
          <Form.Group key={name}>
            <Form.Label>{_.upperFirst(name)}:</Form.Label>
            <Controller
              defaultValue=""
              name={name}
              control={control}
              render={({ onChange }) => (
                <Typeahead
                  options={productsData}
                  id={name}
                  labelKey={name}
                  onChange={([data]) => onChange(data[name])}
                />
              )}
            />
          </Form.Group>
        ))}
        <div className="mb-3">
          <span className="mb-2 d-block">Price, USD:</span>
          <Form.Row as={Row} xs={1} sm={2} className="mb-0">
            <Col>
              <Form.Group as={Form.Row} controlId="currMinPrice">
                <Form.Label column sm={1.5}>
                  min:
                </Form.Label>
                <Col>
                  <Form.Control
                    ref={register}
                    placeholder={minAndMaxRangePrices.min}
                    name="currMinPrice"
                    onChange={onPriceInputsChange}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Form.Row} controlId="currMaxPrice">
                <Form.Label column sm={1.5}>
                  max:
                </Form.Label>
                <Col>
                  <Form.Control
                    ref={register}
                    placeholder={minAndMaxRangePrices.max}
                    name="currMaxPrice"
                    onChange={onPriceInputsChange}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Form.Row>
          <ReactBootstrapSliderWrapper
            value={[
              +inputsState.currMinPrice || 0,
              +inputsState.currMaxPrice || 0,
            ]}
            slideStop={onPriceRangeChange}
            min={minAndMaxRangePrices.min || 0}
            max={minAndMaxRangePrices.max || 0}
            isLoaded={isLoaded}
          />
        </div>
        <Form.Group className="d-flex flex-column align-items-start">
          <Form.Label>Rating:</Form.Label>
          <Controller
            defaultValue={baseInputsState.rating}
            name="rating"
            control={control}
            render={({ value, onChange }) => (
              <ReactStarRatingComponent
                className="ml-n1"
                renderStarIcon={(iconIndex, currRating) => {
                  return (
                    <Icon
                      href={`rating${iconIndex > currRating ? '-border' : ''}`}
                      className="w-8 h-8 text-yellow"
                    />
                  );
                }}
                value={+value}
                onStarClick={onChange}
              />
            )}
          />
        </Form.Group>
        <Button
          type="submit"
          block
          disabled={Object.values(inputsState).every((value) => !value)}
        >
          Apply Filters
        </Button>
      </Form>
    </div>
  );
});

ProductsFilterForm.propTypes = {
  className: PropTypes.string,
  isLoaded: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func,
  productsData: PropTypes.arrayOf(PropTypes.shape(ProductData)).isRequired,
};
