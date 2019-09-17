import React, { forwardRef, memo, useCallback } from 'react';
import { area as shape } from 'd3';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import _ from 'underscore';

import Curves from '../Curves';
import Layer from '../Layer';

const ACCESSORS = [
  'context',
  'curve',
  'defined',
  'lineX0',
  'lineX1',
  'lineY0',
  'lineY1',
  'x0',
  'x1',
  'y0',
  'y1',
];

const D = ['points'];

const Area = ({
  color = randomColor(),
  forwardedRef,
  onClick = () => {},
  onFocus = () => {},
  onMouseOver = () => {},
  x,
  y,
  ...argv
}) => {
  const attributes = _.pick(argv, ...D, ...ACCESSORS);
  const props = _.omit(argv, ...D, ...ACCESSORS);

  const centroid = Area.centroid(attributes);
  const d = Area.d(attributes);
  const data = { centroid, x, y };

  const inject = useCallback(
    onCb => event => {
      // eslint-disable-next-line no-param-reassign
      event.shape = data;

      onCb(event);
    },
    [JSON.stringify(data)],
  );

  return (
    <Layer label="area" x={x} y={y}>
      <path
        fill={color}
        {...props}
        d={d}
        onClick={inject(onClick)}
        onFocus={inject(onFocus)}
        onMouseOver={inject(onMouseOver)}
        ref={forwardedRef}
      />
    </Layer>
  );
};

Area.propTypes = {
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
  x: PropTypes.number,
  y: PropTypes.number,
};

Area.centroid = ({ points = [] }) => {
  const first = points[0] || [0, 0, 0];
  const last = points[points.length - 1] || [0, 0, 0];

  const dimensions = first.length;

  return [
    (first[0] + last[0]) / 2,
    dimensions > 2 ? (first[2] + last[2]) / 2 : (first[1] + last[1]) / 2,
  ];
};

Area.d = ({ curve: curveName, points = [], y0: rawY0, ...argv }) => {
  const curve = Curves[curveName] || curveName;
  const dimensions = (points[0] || []).length;
  const y0 = rawY0 || (dimensions > 2 ? datum => datum[2] : undefined);

  const area = Object.entries({ ...argv, curve, y0 }).reduce(
    (acc, [key, value]) => acc[key](value),
    shape(),
  );

  return area(points);
};

const AreaForwarded = memo(
  forwardRef((props, ref) => <Area {...props} forwardedRef={ref} />),
);

AreaForwarded.d = Area.d;

export default AreaForwarded;
