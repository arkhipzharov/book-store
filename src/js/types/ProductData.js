import PropTypes from 'prop-types';

// using PascalCase as with typescript interfaces
export const ProductData = {
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
  cover_img_url: PropTypes.string,
  example_text: PropTypes.string,
  author: PropTypes.string,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
      rating: PropTypes.number,
      text: PropTypes.string,
    }),
  ),
};
