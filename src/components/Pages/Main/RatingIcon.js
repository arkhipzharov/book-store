import PropTypes from 'prop-types';

import { Icon } from '@/components/Icon';

export const RatingIcon = ({ isEmpty }) => (
  <Icon href={isEmpty ? 'rating-border' : 'rating'} className="w-8 h-8" />
);

RatingIcon.propTypes = {
  isEmpty: PropTypes.bool.isRequired,
};
