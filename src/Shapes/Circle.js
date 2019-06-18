import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';

const Circle = ({
  color = randomColor(),
  forwardedRef,
  onClick = () => {},
  onFocus = () => {},
  onMouseOver = () => {},
  radius,
  x,
  y,
  ...props
}) => {
  const handleClick = event => {
    const centroid = [(x + radius) / 2, (y + radius) / 2];
    // eslint-disable-next-line no-param-reassign
    event.shape = { centroid, radius, x, y };

    onClick(event);
  };

  const handleFocus = event => {
    const centroid = [(x + radius) / 2, (y + radius) / 2];
    // eslint-disable-next-line no-param-reassign
    event.shape = { centroid, radius, x, y };

    onFocus(event);
  };

  const handleMouseOver = event => {
    const centroid = [(x + radius) / 2, (y + radius) / 2];
    // eslint-disable-next-line no-param-reassign
    event.shape = { centroid, radius, x, y };

    onMouseOver(event);
  };

  return (
    <circle
      cx={x}
      cy={y}
      fill={color}
      r={radius}
      {...props}
      onClick={handleClick}
      onFocus={handleFocus}
      onMouseOver={handleMouseOver}
      ref={forwardedRef}
    />
  );
};

Circle.propTypes = {
  color: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseOver: PropTypes.func,
  radius: PropTypes.number.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
};

export default memo(
  forwardRef((props, ref) => <Circle {...props} forwardedRef={ref} />),
);
