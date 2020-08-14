import PropTypes from 'prop-types';
import { Card, Badge, Button } from 'react-bootstrap';
import { Icon } from '@/components/Icon';
import styled from 'styled-components';
import Rating from 'react-rating';
import { RatingIcon } from './RatingIcon';

export const Product = ({ data }) => {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={require('@/assets/img/logos/react-logo.png')}
      />
      <Card.Body>
        <Card.Title as="h4">{data.name}</Card.Title>
        <Card.Title as="h6">{data.author}</Card.Title>
        <Card.Title as="h5">Description</Card.Title>
        <Card.Text>{data.description}</Card.Text>
        <Card.Title as="h5">Example text</Card.Title>
        <Card.Text>{data.example_text}</Card.Text>
        <div className="mb-2">
          <Rating
            emptySymbol={<RatingIcon isEmpty />}
            fullSymbol={<RatingIcon isEmpty={false} />}
            className="mr-2 text-warning"
            initialRating={data.rating}
            readonly
          />
          <Badge variant="primary">
            <strong>{data.reviews.length}</strong>
          </Badge>
        </div>
        <div className="display-4 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <span className="text-primary">4</span>
            <Icon href="usd" className="text-primary w-12 h-12" />
          </div>
          <Button>
            <Icon href="shopping-cart" className="w-8 h-8" />
          </Button>
        </div>
      </Card.Body>
      <StyledIcon href="favorite" className="w-8 h-8 text-danger" />
    </Card>
  );
};

Product.propTypes = {
  // eslint complains that `Prop type `object` is forbidden`
  // when using `PropTypes.object`
  // https://github.com/yannickcr/eslint-plugin-react/issues/2079#issuecomment-467749085
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 20px;
  right: 20px;
`;
