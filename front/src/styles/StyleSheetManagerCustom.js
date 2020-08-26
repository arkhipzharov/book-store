import PropTypes from 'prop-types';
import { StyleSheetManager } from 'styled-components';

export const StyleSheetManagerCustom = ({ children }) => {
  return (
    <StyleSheetManager
      // (pending)
      // prefixes not added in production if NODE_ENV is `production`,
      // but we keep env check to not disable some functionality accidentally.
      // maybe this is because styled components get current user's browser
      // info in runtime
      // See this repo to reproduce - https://github.com/shiftenko/css-prefixes-demo
      disableVendorPrefixes={process.env.NODE_ENV !== 'production'}
    >
      {children}
    </StyleSheetManager>
  );
};

StyleSheetManagerCustom.propTypes = {
  children: PropTypes.node.isRequired,
};
