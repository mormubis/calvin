import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import randomColor from 'random-color';
import _ from 'underscore';

const Rect = (
  {
    color = randomColor().hexString(),
    height,
    onClick = () => {},
    onFocus = () => {},
    onMouseOver = () => {},
    radius = 0,
    width,
    x,
    y,
    ...props
  },
  ref,
) => {
  const handleClick = event => {
    // eslint-disable-next-line no-param-reassign
    event.shape = {
      centroid: [x + width / 2, y + height],
      height,
      width,
      x,
      y,
    };

    onClick(event);
  };

  const handleFocus = event => {
    // eslint-disable-next-line no-param-reassign
    event.shape = {
      centroid: [x + width / 2, y + height],
      height,
      width,
      x,
      y,
    };

    onFocus(event);
  };

  const handleMouseOver = event => {
    // eslint-disable-next-line no-param-reassign
    event.shape = {
      centroid: [x + width / 2, y + height],
      height,
      width,
      x,
      y,
    };

    onMouseOver(event);
  };

  return (
    <rect
      fill={color}
      rx={radius}
      {...props}
      onClick={handleClick}
      onFocus={handleFocus}
      onMouseOver={handleMouseOver}
      ref={ref}
    />
  );
};

Rect.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseOver: PropTypes.func,
  radius: PropTypes.number,
  width: PropTypes.number.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
};

export default _.compose(
  memo,
  forwardRef,
)(Rect);
