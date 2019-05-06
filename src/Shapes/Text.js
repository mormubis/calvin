import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';

const TEXT = {
  center: 'middle',
  left: 'start',
  right: 'end',
};

const VERTICAL = {
  baseline: 'baseline',
  middle: 'central',
  top: 'hanging',
};

const Text = ({
  color = '#222',
  forwardedRef,
  onClick = () => {},
  onFocus = () => {},
  onMouseOver = () => {},
  textAlign,
  verticalAlign,
  x,
  y,
  ...props
}) => {
  const handleClick = event => {
    // eslint-disable-next-line no-param-reassign
    event.shape = {
      x,
      y,
    };

    onClick(event);
  };

  const handleFocus = event => {
    // eslint-disable-next-line no-param-reassign
    event.shape = {
      x,
      y,
    };

    onFocus(event);
  };

  const handleMouseOver = event => {
    // eslint-disable-next-line no-param-reassign
    event.shape = {
      x,
      y,
    };

    onMouseOver(event);
  };

  return (
    <text
      alignmentBaseline={VERTICAL[verticalAlign]}
      dominantBaseline={VERTICAL[verticalAlign]}
      fill={color}
      textAnchor={TEXT[textAlign]}
      {...props}
      onClick={handleClick}
      onFocus={handleFocus}
      onMouseOver={handleMouseOver}
      ref={forwardedRef}
      x={x}
      y={y}
    />
  );
};

Text.propTypes = {
  color: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseOver: PropTypes.func,
  textAlign: PropTypes.oneOf(['center', 'left', 'right']),
  verticalAlign: PropTypes.oneOf(['baseline', 'middle', 'top']),
  x: PropTypes.number,
  y: PropTypes.number,
};

export default memo(
  forwardRef((props, ref) => <Text {...props} forwardedRef={ref} />),
);
