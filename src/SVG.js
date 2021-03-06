import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';

const SVG = ({ children, forwardedRef, height, width, ...props }) => (
  <svg
    preserveAspectRatio="xMidYMid meet"
    viewBox={`0 0 ${width} ${height}`}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </svg>
);

SVG.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default memo(
  forwardRef((props, ref) => <SVG {...props} forwardedRef={ref} />),
);
