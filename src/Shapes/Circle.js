import React, { forwardRef, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';

const Circle = ({
  color = randomColor(),
  forwardedRef,
  onClick = () => {},
  onFocus = () => {},
  onMouseOver = () => {},
  radius,
  x,
  y,
  ...props
}) => {
  const centroid = [(x + radius) / 2, (y + radius) / 2];
  const data = { centroid, radius, x, y };

  const inject = useCallback(
    onCb => event => {
      // eslint-disable-next-line no-param-reassign
      event.shape = data;

      onCb(event);
    },
    [JSON.stringify(data)],
  );

  return (
    <circle
      cx={x}
      cy={y}
      fill={color}
      r={radius}
      {...props}
      onClick={inject(onClick)}
      onFocus={inject(onFocus)}
      onMouseOver={inject(onMouseOver)}
      ref={forwardedRef}
    />
  );
};

Circle.propTypes = {
  color: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseOver: PropTypes.func,
  radius: PropTypes.number.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
};

export default memo(
  forwardRef((props, ref) => <Circle {...props} forwardedRef={ref} />),
);
