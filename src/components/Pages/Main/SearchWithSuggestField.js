import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import { Typeahead } from 'react-bootstrap-typeahead';
import _ from 'lodash';
import { ProductData } from '@/js/types/ProductData';
import { forwardRef } from 'react';

export const SearchWithSuggestField = forwardRef(
  function SearchWithSuggestField({ control, productsData, inputName }, ref) {
    return (
      <Form.Group>
        <Form.Label>{_.upperFirst(inputName)}:</Form.Label>
        <Controller
          control={control}
          defaultValue=""
          name={inputName}
          render={({ onChange }) => (
            <Typeahead
              ref={ref}
              id={inputName}
              labelKey={inputName}
              options={productsData}
              onChange={([data]) => onChange(data ? data[inputName] : '')}
            />
          )}
        />
      </Form.Group>
    );
  },
);

SearchWithSuggestField.propTypes = {
  control: PropTypes.oneOfType([PropTypes.object]).isRequired,
  productsData: PropTypes.arrayOf(PropTypes.shape(ProductData)).isRequired,
  inputName: PropTypes.string.isRequired,
};
