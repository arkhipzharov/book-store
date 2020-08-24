import PropTypes from 'prop-types';
import { ProductData } from '@/js/types/ProductData';
import styled from 'styled-components';
import { CardColumns } from 'react-bootstrap';
import { Product } from './Product';

export const ProductsGrid = ({
  productsData,
  isFavorite = false,
  isCart = false,
}) => {
  return (
    <StyledCardColumns>
      {productsData.map((data, i) => (
        <Product
          key={data.name}
          data={data}
          isCart={isCart}
          isFavorite={isFavorite}
          isInCart={i % 3 === 0}
          isInFavorite={i % 3 === 0}
        />
      ))}
    </StyledCardColumns>
  );
};

ProductsGrid.propTypes = {
  isCart: PropTypes.bool,
  isFavorite: PropTypes.bool,
  productsData: PropTypes.arrayOf(PropTypes.shape(ProductData)).isRequired,
};

const StyledCardColumns = styled(CardColumns)`
  @media (min-width: 576px) {
    column-count: 1;
  }

  @media (min-width: 768px) {
    column-count: 2;
  }

  @media (min-width: 992px) {
    column-count: 3;
  }
`;
