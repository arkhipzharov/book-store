import { Product as ProductComp } from '@front/components/Product';
import { PRODUCTS_DATA_FAKE } from '@front/utils/constants';
import styled from 'styled-components';

export const Info = () => {
  return <StyledProductComp data={PRODUCTS_DATA_FAKE[0]} isProductPage />;
};

const StyledProductComp = styled(ProductComp)`
  border: 0;

  .card-body {
    padding: 0;
  }
`;
