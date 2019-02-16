import React, { memo } from 'react';
import PropTypes from 'prop-types';

export const Layer = ({ children, x, y, ...props }) => (
  <g transform={`translate(${x}, ${y})`} {...props}>
    {children}
  </g>
);

Layer.defaultProps = {
  children: undefined,
  x: 0,
  y: 0,
};

Layer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  x: PropTypes.number,
  y: PropTypes.number,
};

export default memo(Layer);
