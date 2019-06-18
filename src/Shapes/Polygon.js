import React, { forwardRef, memo } from 'react';
import { polygonArea as shape, polygonCentroid as c } from 'd3';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';

import Layer from '../Layer';

const Polygon = ({
  color = randomColor(),
  forwardedRef,
  onClick = () => {},
  onFocus = () => {},
  onMouseOver = () => {},
  points = [],
  x,
  y,
  ...props
}) => {
  const centroid = Polygon.centroid({ points });
  const d = Polygon.d({ points });

  const handleClick = event => {
    // eslint-disable-next-line no-param-reassign
    event.shape = { centroid, x, y };

    onClick(event);
  };

  const handleFocus = event => {
    // eslint-disable-next-line no-param-reassign
    event.shape = { centroid, x, y };

    onFocus(event);
  };

  const handleMouseOver = event => {
    // eslint-disable-next-line no-param-reassign
    event.shape = { centroid, x, y };

    onMouseOver(event);
  };

  return (
    <Layer label="polygon" x={x} y={y}>
      <path
        fill={color}
        {...props}
        d={d}
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

Polygon.centroid = ({ points = [] }) => {
  return c(points);
};

Polygon.d = ({ points = [] }) => {
  return shape(points);
};

export default memo(
  forwardRef((props, ref) => <Polygon {...props} forwardedRef={ref} />),
);
