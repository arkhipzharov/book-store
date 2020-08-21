import StarRatingComponent from 'react-star-rating-component';
import { Icon } from '@/components/Icon';
import styled from 'styled-components';

export const ReactStarRatingComponent = ({ ...props }) => {
  return (
    <StyledStartRatingComponent
      name="rating"
      renderStarIcon={(iconIndex, currRating) => {
        return (
          <Icon
            href={`rating${iconIndex > currRating ? '-border' : ''}`}
            className="w-8 h-8 text-yellow"
          />
        );
      }}
      {...props}
    />
  );
};

const StyledStartRatingComponent = styled(StarRatingComponent)`
  label {
    margin-bottom: 0;
  }
`;
