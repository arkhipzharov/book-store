import PropTypes from 'prop-types';
import { ProductData } from '@/js/types/ProductData';
import styled from 'styled-components';
import { CardColumns } from 'react-bootstrap';
import _ from 'lodash';
import { Product } from './Product';

const productsDataInvalidAfterChangeTextsData = {
  sort: {
    text: 'something went wrong with products sorting',
    isMistake: true,
  },
  filter: 'no products fas found with applied filters',
};

export const ProductsGrid = ({
  productsData,
  productsDataInvalidKindOfChange,
}) => {
  let productsDataInvalidText;
  let productsDataInvalidTextOrData;
  if (productsDataInvalidKindOfChange) {
    productsDataInvalidTextOrData =
      productsDataInvalidAfterChangeTextsData[productsDataInvalidKindOfChange];
    productsDataInvalidText = productsDataInvalidTextOrData.isMistake
      ? productsDataInvalidTextOrData.text
      : productsDataInvalidTextOrData;
  }
  return !productsDataInvalidKindOfChange ? (
    <StyledCardColumns>
      {productsData.map((data) => (
        <Product key={data.name} data={data} />
      ))}
    </StyledCardColumns>
  ) : (
    <h4>
      {`
        ${productsDataInvalidTextOrData.isMistake ? 'Sorry, ' : ''}
        ${
          productsDataInvalidTextOrData.isMistake
            ? productsDataInvalidText
            : _.upperFirst(productsDataInvalidText)
        }
      `}
    </h4>
  );
};

ProductsGrid.propTypes = {
  productsData: PropTypes.arrayOf(PropTypes.shape(ProductData)),
  productsDataInvalidKindOfChange: PropTypes.string.isRequired,
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
