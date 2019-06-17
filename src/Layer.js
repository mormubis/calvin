import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Layer = ({
  children,
  forwardedRef,
  label,
  transform = '',
  x = 0,
  y = 0,
  ...props
}) => {
  return (
    <g
      aria-label={label}
      transform={`translate(${x}, ${y}) ${transform}`}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </g>
  );
};

Layer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  label: PropTypes.string,
  transform: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
};

export default forwardRef((props, ref) => (
  <Layer {...props} forwardedRef={ref} />
));
