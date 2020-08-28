import { memo } from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';

export const ReactBootstrapSliderWrapper = memo(
  function ReactBootstrapSliderWrapper(props) {
    return <ReactBootstrapSlider {...props} />;
  },
  (prevProps, nextProps) => {
    return (
      (nextProps.value.some((minOrMaxPrice) => minOrMaxPrice === 0) &&
        nextProps.isLoaded) ||
      prevProps === nextProps
    );
  },
);
