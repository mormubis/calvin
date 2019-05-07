import React, { forwardRef, memo, useRef } from 'react';
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

  const line = Object.entries({ ...argv, curve })
    .filter(([, value]) => Boolean(value))
    .reduce((acc, [key, value]) => acc[key](value), shape());

  return line(points);
};

const lineAccessors = ['context', 'curve', 'defined'];

const Line = ({
  color = randomColor().hexString(),
  forwardedRef,
  onClick = () => {},
  onFocus = () => {},
  onMouseOver = () => {},
  thickness,
  x,
  y,
  ...argv
}) => {
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
        ref={node => {
          element.current = node;

          if (forwardedRef) {
            // eslint-disable-next-line no-param-reassign
            forwardedRef.current = node;
          }
        }}
      />
    </Layer>
  );
};

Line.propTypes = {
  color: PropTypes.string,
  curve: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseOver: PropTypes.func,
  points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  thickness: PropTypes.number.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
};

const LineForwarded = memo(
  forwardRef((props, ref) => <Line {...props} forwardedRef={ref} />),
);

LineForwarded.d = d;

export default LineForwarded;
