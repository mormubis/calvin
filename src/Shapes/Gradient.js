import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import PropTypes from 'prop-types';

function withDirection(WrappedComponent) {
  const name = WrappedComponent.displayName || WrappedComponent.name;

  const Direction = ({ bottom, left, right, top, ...props }) => (
    <WrappedComponent
      {...props}
      x1={left ? 1 : 0}
      x2={right ? 1 : 0}
      y1={top ? 1 : 0}
      y2={bottom ? 1 : 0}
    />
  );

  Direction.displayName = `withDirection(${name})`;

  Direction.defaultProps = {
    bottom: false,
    left: false,
    right: false,
    top: false,
  };

  Direction.propTypes = {
    bottom: PropTypes.bool,
    left: PropTypes.bool,
    right: PropTypes.bool,
    top: PropTypes.bool,
  };

  hoistNonReactStatics(Direction, WrappedComponent);

  return Direction;
}

export const Stop = ({ color, offset, opacity, ...props }) => (
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

Stop.defaultProps = {
  opacity: 1,
};

export const Gradient = ({ children, id, ...props }) => (
  <defs>
    <linearGradient id={id} {...props}>
      {children}
    </linearGradient>
  </defs>
);

Gradient.defaultProps = {
  children: undefined,
};

Gradient.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  id: PropTypes.string.isRequired,
};

export default withDirection(Gradient);
