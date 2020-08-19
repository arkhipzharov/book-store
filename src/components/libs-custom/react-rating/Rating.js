import ReactRating from 'react-rating';
import { RatingIcon } from './RatingIcon';

export const Rating = (props) => {
  return (
    <ReactRating
      emptySymbol={<RatingIcon isEmpty />}
      fullSymbol={<RatingIcon isEmpty={false} />}
      {...props}
    />
  );
};
