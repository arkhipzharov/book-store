import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import { Typeahead } from 'react-bootstrap-typeahead';
import _ from 'lodash';
import { ProductData } from '@/js/types/ProductData';

export const SearchWithSuggestFields = ({
  control,
  productsData,
  searchWithSuggestInputNames,
  searchWithSuggestInputRefs,
}) => {
  return searchWithSuggestInputNames.map((name, i) => (
    <Form.Group key={name}>
      <Form.Label>{_.upperFirst(name)}:</Form.Label>
      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({ onChange }) => (
          <Typeahead
            ref={searchWithSuggestInputRefs[i]}
            id={name}
            labelKey={name}
            options={productsData}
            onChange={([data]) => onChange(data ? data[name] : '')}
          />
        )}
      />
    </Form.Group>
  ));
};

SearchWithSuggestFields.propTypes = {
  control: PropTypes.oneOfType([PropTypes.object]).isRequired,
  productsData: PropTypes.arrayOf(PropTypes.shape(ProductData)).isRequired,
  searchWithSuggestInputNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchWithSuggestInputRefs: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object]),
  ).isRequired,
};
