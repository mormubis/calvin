import React, { forwardRef, memo, useCallback } from 'react';
import { polygonCentroid as c } from 'd3';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';

import Area from './Area';
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

  const data = { centroid, points, x, y };

  const inject = useCallback(
    onCb => event => {
      // eslint-disable-next-line no-param-reassign
      event.shape = data;

      onCb(event);
    },
    [JSON.stringify(data)],
  );

  return (
    <Layer label="polygon" x={x} y={y}>
      <Area
        color={color}
        {...props}
        onClick={inject(onClick)}
        onFocus={inject(onFocus)}
        onMouseOver={inject(onMouseOver)}
        points={points}
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

Polygon.d = Area.d;

export default memo(
  forwardRef((props, ref) => <Polygon {...props} forwardedRef={ref} />),
);
