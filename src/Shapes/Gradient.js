import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';

const Stop = ({ color, offset, opacity = 1, ...props }) => (
  <stop
    offset={`${offset}%`}
    stopColor={color}
    stopOpacity={opacity}
    {...props}
  />
);

Stop.propTypes = {
  color: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
  opacity: PropTypes.number,
};

const Gradient = ({
  angle: raw = 0,
  children,
  forwardedRef,
  id,
  radial,
  ...props
}) => {
  const GradientType = radial ? 'radialGradient' : 'linearGradient';

  const angle = raw % 360;
  const radians = (angle / 180) * Math.PI;

  const x = Math.cos(radians) >= 0 ? 1 : -1;
  const y = Math.sin(radians) >= 0 ? 1 : -1;
  const tan = Math.abs(Math.tan(radians));
  const ctan = Math.abs(1 / tan);

  const quadrant = Math.floor((angle + 135) / 90) % 2 === 1;
  const delta = quadrant ? tan : ctan;

  const start = [0, 0];
  const end = [quadrant ? x : delta * x, quadrant ? delta * y : y];

  if (end[0] < 0) {
    [start[0], end[0]] = [Math.abs(end[0]), start[0]];
  }

  if (end[1] < 0) {
    [start[1], end[1]] = [Math.abs(end[1]), start[1]];
  }

  return (
    <defs>
      <GradientType
        id={id}
        {...(!radial && { x1: start[0], x2: end[0], y1: start[1], y2: end[1] })}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </GradientType>
    </defs>
  );
};

Gradient.propTypes = {
  angle: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  id: PropTypes.string.isRequired,
  radial: PropTypes.bool,
};

export { Stop };

export default memo(
  forwardRef((props, ref) => <Gradient {...props} forwardedRef={ref} />),
);
