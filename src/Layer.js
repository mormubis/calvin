import React, { forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

export const Layer = ({
  children,
  forwardedRef,
  label = uuid(),
  transform = '',
  x = 0,
  y = 0,
  ...props
}) => {
  const id = useRef(label);

  return (
    <g
      aria-label={id}
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
