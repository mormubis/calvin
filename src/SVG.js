import React from 'react';
import PropTypes from 'prop-types';

export const SVG = ({ children, height, width, ...props }) => (
  <svg
    preserveAspectRatio="xMidYMid meet"
    viewBox={`0 0 ${width} ${height}`}
    {...props}
  >
    {children}
  </svg>
);

SVG.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default SVG;
