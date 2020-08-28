import PropTypes from 'prop-types';
import { Row, Col, Form } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
import { ProductData } from '@front/utils/types/ProductData';
import * as h from '@/utils/helpers';
import { ReactBootstrapSliderWrapper } from './ReactBootstrapSliderWrapper';

export const PriceRangeField = ({
  register,
  reset,
  inputsState,
  productsData,
  minAndMaxRangePrices,
  setMinAndMaxRangePrices,
  isLoaded,
  className = '',
}) => {
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
        newValue = h.findClosestNumber(price, [minPrice, maxPrice]);
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
      <span className="mb-2 d-block">Price, USD:</span>
      <Form.Row as={Row} className="mb-0" sm={2} xs={1}>
        {['currMinPrice', 'currMaxPrice'].map((name) => (
          <Col key={name}>
            <Form.Group as={Form.Row} controlId={name}>
              <Form.Label sm={1.5} column>
                {name === 'currMinPrice' ? 'min' : 'max'}:
              </Form.Label>
              <Col>
                <Form.Control
                  ref={register}
                  name={name}
                  placeholder={
                    minAndMaxRangePrices[
                      name === 'currMinPrice' ? 'min' : 'max'
                    ]
                  }
                  onChange={onPriceInputsChange}
                />
              </Col>
            </Form.Group>
          </Col>
        ))}
      </Form.Row>
      <ReactBootstrapSliderWrapper
        isLoaded={isLoaded}
        max={minAndMaxRangePrices.max || 0}
        min={minAndMaxRangePrices.min || 0}
        slideStop={onPriceRangeChange}
        value={[
          +inputsState.currMinPrice || minAndMaxRangePrices.min || 0,
          +inputsState.currMaxPrice || minAndMaxRangePrices.max || 0,
        ]}
      />
    </div>
  );
};

PriceRangeField.propTypes = {
  inputsState: PropTypes.shape({
    currMaxPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    currMinPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  isLoaded: PropTypes.bool.isRequired,
  minAndMaxRangePrices: PropTypes.shape({
    max: PropTypes.oneOfType([PropTypes.oneOf(['']), PropTypes.number]),
    min: PropTypes.oneOfType([PropTypes.oneOf(['']), PropTypes.number]),
  }).isRequired,
  productsData: PropTypes.arrayOf(PropTypes.shape(ProductData)).isRequired,
  register: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  setMinAndMaxRangePrices: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};
