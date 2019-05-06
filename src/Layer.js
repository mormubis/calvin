import React, { forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

export const Layer = (
  { children, label = uuid(), x = 0, y = 0, transform = '', ...props },
  ref,
) => {
  const id = useRef(label);

  return (
    <g
      aria-label={id}
      transform={`translate(${x}, ${y}) ${transform}`}
      {...props}
      ref={ref}
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
  label: PropTypes.string,
  transform: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
};

export default forwardRef(Layer);
