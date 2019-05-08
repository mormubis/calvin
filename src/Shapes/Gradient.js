import React, { useDebugValue, useMemo } from 'react';
import PropTypes from 'prop-types';

const useDirection = ({ bottom, left, right, top }) => {
  useDebugValue(
    `Direction: bottom(${bottom}), left(${left}), right(${right}), top(${top})`,
  );

  return useMemo(() => {
    const x1 = left ? 1 : 0;
    const x2 = right ? 1 : 0;
    const y1 = top ? 1 : 0;
    const y2 = bottom ? 1 : 0;

    return [x1, x2, y1, y2];
  }, [bottom, left, right, top]);
};

export const Stop = ({ color, offset, opacity = 1, ...props }) => (
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

export const Gradient = ({
  bottom,
  children,
  id,
  left,
  right,
  top,
  ...props
}) => {
  const [x1, x2, y1, y2] = useDirection({ bottom, left, right, top });

  return (
    <defs>
      <linearGradient id={id} x1={x1} x2={x2} y1={y1} y2={y2} {...props}>
        {children}
      </linearGradient>
    </defs>
  );
};

Gradient.propTypes = {
  bottom: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  id: PropTypes.string.isRequired,
  left: PropTypes.bool,
  right: PropTypes.bool,
  top: PropTypes.bool,
};

export default Gradient;
