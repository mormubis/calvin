import React, { forwardRef, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';

const Rect = ({
  color = randomColor(),
  forwardedRef,
  height,
  onClick = () => {},
  onFocus = () => {},
  onMouseOver = () => {},
  radius = 0,
  width,
  x,
  y,
  ...props
}) => {
  const centroid = [x + width / 2, y + height];
  const data = { centroid, height, width, x, y };

  const inject = useCallback(
    onCb => event => {
      // eslint-disable-next-line no-param-reassign
      event.shape = data;

      onCb(event);
    },
    [JSON.stringify(data)],
  );

  return (
    <rect
      fill={color}
      height={height}
      rx={radius}
      width={width}
      x={x}
      y={y}
      {...props}
      onClick={inject(onClick)}
      onFocus={inject(onFocus)}
      onMouseOver={inject(onMouseOver)}
      ref={forwardedRef}
    />
  );
};

Rect.propTypes = {
  color: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  height: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseOver: PropTypes.func,
  radius: PropTypes.number,
  width: PropTypes.number.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
};

export default memo(
  forwardRef((props, ref) => <Rect {...props} forwardedRef={ref} />),
);
