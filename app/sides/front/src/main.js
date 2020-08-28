import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
// import { Provider } from 'react-redux';
import { GlobalStyles } from './styles/GlobalStyles';
import { StyleSheetManagerCustom } from './styles/StyleSheetManagerCustom';
import { App } from './components/App';
// import store from './store';
import './js/startup';
// eslint-import-resolver-webpack can't handle css file imports,
// but we are not ignoring that imports in config to not swallow possible errors
// so you should import file with .css (or .scss/etc) extension instead of shorter path
// https://github.com/benmosher/eslint-plugin-import/issues/151#issuecomment-167003063
import 'bootstrap-slider/dist/css/bootstrap-slider.css';
// import { StrictMode } from 'react';

const Root = () => {
  return (
    // uncomment StrictMode and remove fragment if you are think that it
    // will help to find bug in development, after that ignore styled-bootstrap
    // `Using UNSAFE_componentWillMount in strict mode ..` and others
    // https://github.com/bootstrap-styled/v4/issues/212
    // Also keep in mind that StrictMode will render components twice
    // https://stackoverflow.com/a/61961751
    // https://stackoverflow.com/a/61897567
    // <StrictMode>
    <>
      <GlobalStyles />
      <StyleSheetManagerCustom>
        <Router>
          {/* <Provider store={store}> */}
          <App />
          {/* </Provider> */}
        </Router>
      </StyleSheetManagerCustom>
    </>
    // </StrictMode>
  );
};

ReactDOM.render(<Root />, document.querySelector('.root'));
