import PropTypes from 'prop-types';
import { Icon } from '@/components/Icon';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export const SortOptionToggle = ({
  children,
  isNotHaveIncreaseDirection = false,
  isToggled = false,
  isToggledOnce = false,
  onClick,
  className,
}) => {
  const [buttonVariant, setButtonVariant] = useState('outline-primary');
  const setButtonNewVariant = () => {
    let variantNew = 'outline-primary';
    if (isNotHaveIncreaseDirection) {
      if (isToggledOnce) {
        variantNew = 'primary';
      }
    } else if (isToggled) {
      variantNew = 'primary';
    }
    setButtonVariant(variantNew);
  };
  useEffect(() => {
    setButtonNewVariant();
  }, [isToggled, isToggledOnce]);
  return (
    <Button
      size="sm"
      active={isToggledOnce}
      className={className}
      variant={buttonVariant}
      onClick={onClick}
    >
      <span>{children}</span>
      {isToggledOnce && !isNotHaveIncreaseDirection && (
        <Icon
          className="w-6 h-6"
          href={`arrow-drop-${isToggled ? 'down' : 'up'}`}
        />
      )}
    </Button>
  );
};

SortOptionToggle.propTypes = {
  children: PropTypes.node.isRequired,
  isNotHaveIncreaseDirection: PropTypes.bool,
  isToggled: PropTypes.bool.isRequired,
  isToggledOnce: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
