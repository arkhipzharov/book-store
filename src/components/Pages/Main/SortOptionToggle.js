import PropTypes from 'prop-types';
import { Icon } from '@/components/Icon';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export const SortOptionToggle = ({
  children,
  isCanNotToggleIncreaseDirection = false,
  isToggled = false,
  isToggledOnce = false,
  onClick,
  className,
}) => {
  const [buttonVariant, setButtonVariant] = useState('outline-primary');
  const setButtonNewVariant = () => {
    let variantNew = 'outline-primary';
    if (isCanNotToggleIncreaseDirection) {
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
      {isToggledOnce && !isCanNotToggleIncreaseDirection && (
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
  isCanNotToggleIncreaseDirection: PropTypes.bool,
  isToggled: PropTypes.bool.isRequired,
  isToggledOnce: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
