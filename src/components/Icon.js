import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Icon = ({ viewBox = '0 0 1 1', href, fill, className }) => {
  return (
    // using transient props here to not pass props like `width` to the
    // DOM because they are take effect in html for svg elements
    // https://stackoverflow.com/a/62604142
    <Svg viewBox={viewBox} $fill={fill} className={className}>
      {/*
        MDN says that using xlink:href is not recommended, therefore used href
      */}
      <use href={`#${href}`} />
    </Svg>
  );
};

Icon.propTypes = {
  // icon dimensions, read about svg to learn more
  viewBox: PropTypes.string,
  // you should pass icon filename here to find it in svg sprite and include inside page
  href: PropTypes.string.isRequired,
  // hex color of icon, default is currentColor (in custom normalize.css)
  fill: PropTypes.string,
  // passing as prop to be extendable by other styled components
  // https://stackoverflow.com/a/54113434
  // Also you should always set width and height with custom css utils, for example:
  // `className="w-8 h-8"`
  // this is to avoid magic numbers and re-implementing existing utility
  // classes with props
  className: PropTypes.string.isRequired,
};

const Svg = styled.svg`
  fill: ${({ $fill }) => $fill};
`;
