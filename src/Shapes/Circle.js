import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import randomColor from 'random-color';
import _ from 'underscore';

const Circle = (
  {
    color = randomColor().hexString(),
    onClick = () => {},
    onFocus = () => {},
    onMouseOver = () => {},
    radius,
    x,
    y,
    ...props
  },
  ref,
) => {
  const handleClick = event => {
    // eslint-disable-next-line no-param-reassign
    event.shape = {
      centroid: [(x + radius) / 2, (y + radius) / 2],
      radius,
      x,
      y,
    };

    onClick(event);
  };

  const handleFocus = event => {
    // eslint-disable-next-line no-param-reassign
    event.shape = {
      centroid: [(x + radius) / 2, (y + radius) / 2],
      radius,
      x,
      y,
    };

    onFocus(event);
  };

  const handleMouseOver = event => {
    // eslint-disable-next-line no-param-reassign
    event.shape = {
      centroid: [(x + radius) / 2, (y + radius) / 2],
      radius,
      x,
      y,
    };

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
      ref={ref}
    />
  );
};

Circle.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseOver: PropTypes.func,
  radius: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
};

export default _.compose(
  memo,
  forwardRef,
)(Circle);
