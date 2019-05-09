import React, { forwardRef, memo } from 'react';
import { arc as shape } from 'd3';
import PropTypes from 'prop-types';
import randomColor from 'random-color';
import _ from 'underscore';

import Layer from '../Layer';

const centroid = ({
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

const d = ({
  endAngle = 0,
  thickness,
  height = 0,
  startAngle = 0,
  width = 0,
  ...argv
}) => {
  const outerRadius = Math.min(height / 2, width / 2);

  const arc = shape();

  return arc({
    ...argv,
    endAngle: (endAngle / 360) * 2 * Math.PI,
    innerRadius: thickness ? outerRadius - thickness : 0,
    outerRadius,
    startAngle: (startAngle / 360) * 2 * Math.PI,
  });
};

const arcAccessors = [
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
  color = randomColor().hexString(),
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
    ...arcAccessors,
  );
  const props = _.omit(argv, 'height', 'thickness', 'width', ...arcAccessors);

  const position = centroid(arcAttributes);
  const path = d(arcAttributes);

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
    <Layer label="arc" x={x} y={y}>
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

const ArcForwarded = memo(
  forwardRef((props, ref) => <Arc {...props} forwardedRef={ref} />),
);

ArcForwarded.d = d;

export default ArcForwarded;
