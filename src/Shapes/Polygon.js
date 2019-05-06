import React, { forwardRef, memo } from 'react';
import { polygonArea as shape, polygonCentroid as c } from 'd3';
import PropTypes from 'prop-types';
import randomColor from 'random-color';

import Layer from '../Layer';

const centroid = ({ points = [] }) => {
  return c(points);
};

const d = ({ points = [] }) => {
  return shape(points);
};

const Polygon = ({
  color = randomColor().hexString(),
  forwardedRef,
  onClick = () => {},
  onFocus = () => {},
  onMouseOver = () => {},
  points = [],
  x,
  y,
  ...props
}) => {
  const position = centroid({ points });
  const path = d({ points });

  const handleClick = event => {
    // eslint-disable-next-line no-param-reassign
    event.shape = {
      centroid: position,
      x,
      y,
    };

    onClick(event);
  };

  const handleFocus = event => {
    // eslint-disable-next-line no-param-reassign
    event.shape = {
      centroid: position,
      x,
      y,
    };

    onFocus(event);
  };

  const handleMouseOver = event => {
    // eslint-disable-next-line no-param-reassign
    event.shape = {
      centroid: position,
      x,
      y,
    };

    onMouseOver(event);
  };

  return (
    <Layer label="polygon" x={x} y={y}>
      <path
        fill={color}
        {...props}
        d={path}
        onClick={handleClick}
        onFocus={handleFocus}
        onMouseOver={handleMouseOver}
        ref={forwardedRef}
      />
    </Layer>
  );
};

Polygon.propTypes = {
  color: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseOver: PropTypes.func,
  points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
};

export default memo(
  forwardRef((props, ref) => <Polygon {...props} forwardedRef={ref} />),
);
