import React, { forwardRef, memo, useLayoutEffect, useRef } from 'react';
import { extent, line as shape } from 'd3';
import PropTypes from 'prop-types';
import randomColor from 'random-color';
import _ from 'underscore';

import Curves from '../Curves';
import Layer from '../Layer';

const centroid = ({ points = [] }) => {
  const [xMin, xMax] = extent(points, point => point[0]);
  const [yMin, yMax] = extent(points, point => point[1]);

  return [(xMin + xMax) / 2, (yMin + yMax) / 2];
};

const d = ({ curve: curveName, points = [], ...argv }) => {
  const curve = Curves[curveName] || curveName;

  const line = Object.entries({ ...argv, curve }).reduce(
    (acc, [key, value]) => acc[key](value),
    shape(),
  );

  return line(points);
};

const lineAccessors = ['context', 'curve', 'defined'];

const Line = (
  {
    color = randomColor().hexString(),
    onClick = () => {},
    onFocus = () => {},
    onMouseOver = () => {},
    thickness,
    x,
    y,
    ...argv
  },
  ref,
) => {
  const element = useRef(null);
  const lineAttributes = _.pick(argv, 'points', ...lineAccessors);
  const props = _.omit(argv, ...lineAccessors);

  const position = centroid(lineAttributes);
  const path = d(lineAttributes);

  const handleClick = event => {
    // eslint-disable-next-line no-param-reassign
    event.shape = {
      centroid: position,
      length: element.current ? element.current.getTotalLength() : 0,
      thickness,
      x,
      y,
    };

    onClick(event);
  };

  const handleFocus = event => {
    // eslint-disable-next-line no-param-reassign
    event.shape = {
      centroid: position,
      length: element.current ? element.current.getTotalLength() : 0,
      thickness,
      x,
      y,
    };

    onFocus(event);
  };

  const handleMouseOver = event => {
    // eslint-disable-next-line no-param-reassign
    event.shape = {
      centroid: position,
      length: element.current ? element.current.getTotalLength() : 0,
      thickness,
      x,
      y,
    };

    onMouseOver(event);
  };

  useLayoutEffect(() => {
    // eslint-disable-next-line no-param-reassign
    ref.current = element.current;
  }, [ref]);

  return (
    <Layer label="line" x={x} y={y}>
      <path
        fill="none"
        stroke={color}
        strokeWidth={thickness}
        {...props}
        d={path}
        onClick={handleClick}
        onFocus={handleFocus}
        onMouseOver={handleMouseOver}
        ref={ref}
      />
    </Layer>
  );
};

Line.propTypes = {
  color: PropTypes.string,
  curve: PropTypes.string,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseOver: PropTypes.func,
  points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  thickness: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
};

export default _.compose(
  memo,
  forwardRef,
)(Line);
