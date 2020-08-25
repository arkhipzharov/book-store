import { ProductsGrid } from '@/components/ProductsGrid';
import { PRODUCTS_DATA_FAKE } from '@/js/constants';

export const Cart = () => {
  return <ProductsGrid productsData={PRODUCTS_DATA_FAKE} isCartPage />;
};
