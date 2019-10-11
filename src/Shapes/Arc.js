import React, { forwardRef, memo, useCallback } from 'react';
import { arc as shape } from 'd3';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import _ from 'underscore';

import Layer from '../Layer';

const ACCESSORS = [
  'context',
  'cornerRadius',
  'endAngle',
  'innerRadius',
  'outerRadius',
  'padAngle',
  'padRadius',
  'startAngle',
];

const D = ['height', 'thickness', 'width'];

const Arc = ({
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

  const centroid = Arc.centroid(attributes);
  const d = Arc.d(attributes);
  const data = { ...Arc.attrs(attributes), centroid, x, y };

  const inject = useCallback(
    onCb => event => {
      // eslint-disable-next-line no-param-reassign
      event.shape = data;

      onCb(event);
    },
    [JSON.stringify(data)],
  );

  return (
    <Layer label="arc" x={x} y={y}>
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

Arc.propTypes = {
  color: PropTypes.string,
  cornerRadius: PropTypes.number,
  endAngle: PropTypes.number.isRequired,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  height: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseOver: PropTypes.func,
  startAngle: PropTypes.number.isRequired,
  thickness: PropTypes.number,
  width: PropTypes.number.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
};

Arc.attrs = ({
  endAngle = 0,
  thickness,
  height = 0,
  startAngle = 0,
  width = 0,
  ...rest
}) => {
  const outerRadius = Math.min(height / 2, width / 2);

  return {
    ...rest,
    endAngle: (endAngle / 360) * 2 * Math.PI,
    innerRadius: thickness ? outerRadius - thickness : 0,
    outerRadius,
    startAngle: (startAngle / 360) * 2 * Math.PI,
  };
};

Arc.centroid = attrs => {
  const arc = shape();

  return arc.centroid(Arc.attrs(attrs));
};

Arc.d = ({ cornerRadius, ...attrs }) => {
  let arc = shape();

  if (cornerRadius) {
    arc = arc.cornerRadius(cornerRadius);
  }

  return arc(Arc.attrs(attrs));
};

const ArcForwarded = memo(
  forwardRef((props, ref) => <Arc {...props} forwardedRef={ref} />),
);

ArcForwarded.d = Arc.d;

export default ArcForwarded;
