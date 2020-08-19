// reset most of react-bootstrap default button styles with this component

import PropTypes from 'prop-types';
import styled from 'styled-components';

export const WrapperButton = ({ children, ...props }) => {
  return (
    <Button type="button" {...props}>
      {children}
    </Button>
  );
};

WrapperButton.propTypes = {
  children: PropTypes.node.isRequired,
};

const Button = styled.button`
  padding: 0;
  background-color: inherit;
  border: 0;
`;
