import React, { forwardRef, memo } from 'react';
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
  const arcAttributes = _.pick(
    argv,
    'height',
    'thickness',
    'width',
    ...ACCESSORS,
  );
  const props = _.omit(argv, 'height', 'thickness', 'width', ...ACCESSORS);

  const centroid = Arc.centroid(arcAttributes);
  const d = Arc.d(arcAttributes);

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
    <Layer label="arc" x={x} y={y}>
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

Arc.propTypes = {
  color: PropTypes.string,
  cornerRadius: PropTypes.number,
  endAngle: PropTypes.number.isRequired,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
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

Arc.centroid = ({
  endAngle = 0,
  thickness,
  height = 0,
  startAngle = 0,
  width = 0,
  ...argv
}) => {
  const outerRadius = Math.min(height / 2, width / 2);

  const arc = shape();

  return arc.centroid({
    ...argv,
    endAngle: (endAngle / 360) * 2 * Math.PI,
    innerRadius: thickness ? outerRadius - thickness : 0,
    outerRadius,
    startAngle: (startAngle / 360) * 2 * Math.PI,
  });
};

Arc.d = ({
  cornerRadius,
  endAngle = 0,
  thickness,
  height = 0,
  startAngle = 0,
  width = 0,
  ...argv
}) => {
  const outerRadius = Math.min(height / 2, width / 2);

  let arc = shape();

  if (cornerRadius) {
    arc = arc.cornerRadius(cornerRadius);
  }

  return arc({
    ...argv,
    endAngle: (endAngle / 360) * 2 * Math.PI,
    innerRadius: thickness ? outerRadius - thickness : 0,
    outerRadius,
    startAngle: (startAngle / 360) * 2 * Math.PI,
  });
};

const ArcForwarded = memo(
  forwardRef((props, ref) => <Arc {...props} forwardedRef={ref} />),
);

ArcForwarded.d = Arc.d;

export default ArcForwarded;
