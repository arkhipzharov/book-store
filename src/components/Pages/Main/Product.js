import PropTypes from 'prop-types';
import { Card, Badge, Button } from 'react-bootstrap';
import { Icon } from '@/components/Icon';
import styled from 'styled-components';
import { useState } from 'react';
import {
  WrapperButton,
  ReactStarRatingComponent,
} from '@/components/libs-custom';
import { ProductData } from '@/js/types/ProductData';

export const Product = ({ data }) => {
  const [isHoverFavorite, setIsHoverFavorite] = useState(false);
  return (
    <Card>
      <Card.Img
        variant="top"
        src={require('@/assets/img/logos/react-logo.png')}
      />
      <Card.Body>
        <Card.Title as="h4">{data.name}</Card.Title>
        <Card.Title as="h6">{data.author}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">
          {data.category}
        </Card.Subtitle>
        <Card.Title as="h5">Description</Card.Title>
        <Card.Text>{data.description}</Card.Text>
        <Card.Title as="h5">Example Text</Card.Title>
        <Card.Text>{data.example_text}</Card.Text>
        <div className="mb-2 d-flex align-items-center">
          <ReactStarRatingComponent
            className="mr-2"
            value={data.rating}
            editing={false}
          />
          <Badge variant="primary">
            <strong>{data.reviews.length}</strong>
          </Badge>
        </div>
        <div className="display-4 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <span className="text-primary">{data.price}</span>
            <Icon href="usd" className="text-primary w-12 h-12" />
          </div>
          <Button>
            <Icon href="shopping-cart" className="w-8 h-8" />
          </Button>
        </div>
      </Card.Body>
      <StyledButton
        onMouseEnter={() => setIsHoverFavorite(true)}
        onMouseLeave={() => setIsHoverFavorite(false)}
      >
        <Icon
          href={isHoverFavorite ? 'favorite' : 'favorite-border'}
          className="w-8 h-8 text-red"
        />
      </StyledButton>
    </Card>
  );
};

Product.propTypes = {
  data: PropTypes.shape(ProductData).isRequired,
};

const StyledButton = styled(WrapperButton)`
  position: absolute;
  top: 20px;
  right: 20px;
`;
