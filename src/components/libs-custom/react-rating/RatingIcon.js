import PropTypes from 'prop-types';
import { Icon } from '@/components/Icon';

export const RatingIcon = ({ isEmpty }) => (
  <Icon
    href={`rating${isEmpty ? '-border' : ''}`}
    className="w-8 h-8 text-yellow"
  />
);

RatingIcon.propTypes = {
  isEmpty: PropTypes.bool.isRequired,
};
