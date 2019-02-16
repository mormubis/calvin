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

SVG.defaultProps = {
  children: undefined,
  height: 0,
  width: 0,
};

SVG.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  height: PropTypes.number,
  width: PropTypes.number,
};

export default SVG;
