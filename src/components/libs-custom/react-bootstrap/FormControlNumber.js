import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export const FormControlNumber = ({ value, ...props }) => {
  // https://github.com/facebook/react/issues/7779#issuecomment-248432471
  const valueFinal = value || value === 0 ? value : '';
  return <Form.Control type="number" value={valueFinal} {...props} />;
};

FormControlNumber.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([''])])
    .isRequired,
};
