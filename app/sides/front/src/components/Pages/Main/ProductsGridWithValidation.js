import PropTypes from 'prop-types';
import { ProductData } from '@front/utils/types/ProductData';
import _ from 'lodash';
import { ProductsGrid } from '@front/components/ProductsGrid';

const PRODUCTS_DATA_INVALID_AFTER_CHANGE_DATA = {
  sort: {
    text: 'something went wrong with products sorting',
    isMistake: true,
  },
  filter: 'no products fas found with applied filters',
};

export const ProductsGridWithValidation = ({
  productsData,
  productsDataInvalidKindOfChange,
}) => {
  let productsDataInvalidText;
  let productsDataInvalidTextOrData;
  if (productsDataInvalidKindOfChange) {
    productsDataInvalidTextOrData =
      PRODUCTS_DATA_INVALID_AFTER_CHANGE_DATA[productsDataInvalidKindOfChange];
    productsDataInvalidText = productsDataInvalidTextOrData.isMistake
      ? productsDataInvalidTextOrData.text
      : productsDataInvalidTextOrData;
  }
  return !productsDataInvalidKindOfChange ? (
    <ProductsGrid productsData={productsData} />
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

ProductsGridWithValidation.propTypes = {
  productsData: PropTypes.arrayOf(PropTypes.shape(ProductData)).isRequired,
  productsDataInvalidKindOfChange: PropTypes.string.isRequired,
};
