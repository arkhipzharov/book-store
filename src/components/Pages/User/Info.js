import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const FIRST_NAME_FAKE = 'John';
const LAST_NAME_FAKE = 'Johnson';

export const Info = ({ className = '' }) => {
  return (
    <div className={className}>
      <h4>
        {FIRST_NAME_FAKE} {LAST_NAME_FAKE}
      </h4>
    </div>
  );
};

Info.propTypes = {
  className: PropTypes.string,
};
