import { useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Form, Col, Row } from 'react-bootstrap';
import { FormControlNumber } from '@/components/libs-custom';
import { findClosestNumber } from '@/js/helpers';
import { ReactBootstrapSliderWrapper } from './ReactBootstrapSliderWrapper';

// export named function when using memo to see component name in react devtools
// https://github.com/react-spring/react-three-fiber/issues/534#issuecomment-654138302
export const ProductsFilterForm = memo(function ProductsFilterForm({
  productsData,
  isLoaded,
  className,
}) {
  const [inputsState, setInputsState] = useState({
    currMinPrice: '',
    currMaxPrice: '',
  });
  const [minAndMaxRangePrices, setMinAndMaxRangePrices] = useState({
    min: inputsState.currMinPrice,
    max: inputsState.currMaxPrice,
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
      currMaxPrice !== '' && isMin && price > currMaxPrice;
    const isMaxLessThanMin =
      currMinPrice !== '' && !isMin && price < currMinPrice;
    const isRangeInvalid = isMinGreaterThanMax || isMaxLessThanMin;
    const isStaticMinMaxRangeInvalid = price < minPrice || price > maxPrice;
    let newValue;
    if (isEmptyInput) {
      setInputsState({
        ...inputsState,
        [name]: '',
      });
    } else {
      if (isRangeInvalid) {
        newValue = isMin ? currMaxPrice : currMinPrice;
      } else if (isStaticMinMaxRangeInvalid) {
        newValue = findClosestNumber(price, [minPrice, maxPrice]);
      } else {
        newValue = price;
      }
      setInputsState({
        ...inputsState,
        ...(isPriceNumberValid ? { [name]: newValue } : {}),
      });
    }
  };
  const onPriceRangeChange = (e) => {
    const [currMinPrice, currMaxPrice] = e.target.value;
    setInputsState({
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
    setInputsState({
      ...inputsState,
      currMinPrice,
      currMaxPrice,
    });
    setMinAndMaxRangePrices({
      min: currMinPrice,
      max: currMaxPrice,
    });
  }, [isLoaded]);
  return (
    <Form className={className}>
      <Form.Group>
        <Form.Label>Book name:</Form.Label>
        <Typeahead options={['one', 'two']} id="name" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Author:</Form.Label>
        <Typeahead options={['one', 'two']} id="author" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Category:</Form.Label>
        <Typeahead options={['one', 'two']} id="category" />
      </Form.Group>
      <div>
        <span className="mb-2 d-block">Price, USD:</span>
        <Form.Row as={Row} xs={1} sm={2} className="mb-0">
          <Col>
            <Form.Group as={Form.Row} controlId="currMinPrice">
              <Form.Label column sm={1.5}>
                min
              </Form.Label>
              <Col>
                <FormControlNumber
                  name="currMinPrice"
                  value={inputsState.currMinPrice}
                  onChange={onPriceInputsChange}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group as={Form.Row} controlId="currMaxPrice">
              <Form.Label column sm={1.5}>
                max
              </Form.Label>
              <Col>
                <FormControlNumber
                  name="currMaxPrice"
                  value={inputsState.currMaxPrice}
                  onChange={onPriceInputsChange}
                />
              </Col>
            </Form.Group>
          </Col>
        </Form.Row>
        <ReactBootstrapSliderWrapper
          value={[inputsState.currMinPrice || 0, inputsState.currMaxPrice || 0]}
          slideStop={onPriceRangeChange}
          min={minAndMaxRangePrices.min || 0}
          max={minAndMaxRangePrices.max || 0}
          isLoaded={isLoaded}
        />
      </div>
    </Form>
  );
});

ProductsFilterForm.propTypes = {
  className: PropTypes.string,
  isLoaded: PropTypes.bool.isRequired,
  productsData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
