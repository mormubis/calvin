import React, { forwardRef, memo, useRef } from 'react';
import { extent, line as shape } from 'd3';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import _ from 'underscore';

import Curves from '../Curves';
import Layer from '../Layer';

const ACCESSORS = ['context', 'curve', 'defined'];
const D = ['points'];

const Line = ({
  color = randomColor(),
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
  const attributes = _.pick(argv, ...D, ...ACCESSORS);
  const props = _.omit(argv, ...D, ...ACCESSORS);

  const centroid = Line.centroid(attributes);
  const d = Line.d(attributes);
  const data = { centroid, thickness, x, y };

  const handleClick = event => {
    const length = element.current ? element.current.getTotalLength() : 0;
    // eslint-disable-next-line no-param-reassign
    event.shape = { ...data, length };

    onClick(event);
  };

  const handleFocus = event => {
    const length = element.current ? element.current.getTotalLength() : 0;
    // eslint-disable-next-line no-param-reassign
    event.shape = { ...data, length };

    onFocus(event);
  };

  const handleMouseOver = event => {
    const length = element.current ? element.current.getTotalLength() : 0;
    // eslint-disable-next-line no-param-reassign
    event.shape = { ...data, length };

    onMouseOver(event);
  };

  return (
    <Layer label="line" x={x} y={y}>
      <path
        fill="none"
        stroke={color}
        strokeWidth={thickness}
        {...props}
        d={d}
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
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseOver: PropTypes.func,
  points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  thickness: PropTypes.number.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
};

Line.centroid = ({ points = [] }) => {
  const [xMin, xMax] = extent(points, point => point[0]);
  const [yMin, yMax] = extent(points, point => point[1]);

  return [(xMin + xMax) / 2, (yMin + yMax) / 2];
};

Line.d = ({ curve: curveName, points = [], ...argv }) => {
  const curve = Curves[curveName] || curveName;

  const line = Object.entries({ ...argv, curve })
    .filter(([, value]) => Boolean(value))
    .reduce((acc, [key, value]) => acc[key](value), shape());

  return line(points);
};

const LineForwarded = memo(
  forwardRef((props, ref) => <Line {...props} forwardedRef={ref} />),
);

LineForwarded.d = Line.d;

export default LineForwarded;
