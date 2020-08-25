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

export const Product = ({
  data,
  isCartPage = false,
  isFavoritePage = false,
  isProductPage = false,
  isInCart = false,
  isInFavorite = false,
  padding = 0,
  className = '',
}) => {
  const [isHoverFavorite, setIsHoverFavorite] = useState(false);
  return (
    <Card className={className}>
      <CardImgWrapper
        className="d-flex justify-content-center"
        padding={padding}
      >
        <StyledCardImg
          $height={isProductPage && 500}
          src={require('@/assets/img/logos/react.png')}
          variant="top"
        />
      </CardImgWrapper>
      <Card.Body className="w-100">
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
            editing={false}
            value={data.rating}
          />
          {!isProductPage && (
            <Badge as={Button} variant="primary">
              <strong>{data.reviews.length}</strong>
            </Badge>
          )}
        </div>
        <div className="display-4 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <span className="text-primary">{data.price}</span>
            <Icon className="text-primary w-12 h-12" href="usd" />
          </div>
          {!isCartPage && !isProductPage && (
            <Button>
              <Icon className="w-6 h-6 mr-1" href="shopping-cart" />
              <span>{isInCart ? 'In Cart' : 'Add To Cart'}</span>
            </Button>
          )}
        </div>
      </Card.Body>
      {!isFavoritePage && !isProductPage && (
        <StyledButton
          onMouseEnter={() => !isInFavorite && setIsHoverFavorite(true)}
          onMouseLeave={() => !isInFavorite && setIsHoverFavorite(false)}
        >
          <Icon
            className="w-8 h-8 text-red"
            href={
              isHoverFavorite || isInFavorite ? 'favorite' : 'favorite-border'
            }
          />
        </StyledButton>
      )}
    </Card>
  );
};

Product.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape(ProductData).isRequired,
  isCartPage: PropTypes.bool,
  isFavoritePage: PropTypes.bool,
  isInCart: PropTypes.bool,
  isInFavorite: PropTypes.bool,
  isProductPage: PropTypes.bool,
  padding: PropTypes.string,
};

const CardImgWrapper = styled.div`
  padding: ${({ padding }) => padding}px;
`;

const StyledCardImg = styled(Card.Img)`
  ${({ $height }) => $height && `width: ${$height}px`};
`;

const StyledButton = styled(WrapperButton)`
  position: absolute;
  top: 20px;
  right: 20px;
`;
