import StarRatingComponent from 'react-star-rating-component';
import { Icon } from '@front/components/Icon';
import styled from 'styled-components';

export const ReactStarRatingComponent = ({ ...props }) => {
  return (
    <StyledStartRatingComponent
      name="rating"
      renderStarIcon={(iconInd, currRating) => {
        return (
          <Icon
            className="w-8 h-8 text-yellow"
            href={`rating${iconInd > currRating ? '-border' : ''}`}
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
