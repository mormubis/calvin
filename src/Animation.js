import React from 'react';
import PropTypes from 'prop-types';

import Easings from './Easings';

const FPS = 16;

export const Animation = ({
  attribute,
  callback: cb,
  delay,
  duration,
  ease,
  from,
  to,
  ...props
}) => {
  const callback = cb || (percentage => percentage * (to - from) + from);
  const easing = Easings[ease] || Easings.linear;
  const frames = Math.round(duration / FPS);
  const values = Array(frames)
    .fill(0)
    .map((ignore, index) => {
      const time = index / frames;

      return callback(easing(time));
    })
    .join(';');

  return (
    <animate
      attributeName={attribute}
      begin={`${delay}ms`}
      dur={`${duration}ms`}
      from={from}
      to={to}
      repeatCount={1}
      values={ease !== 'linear' || attribute === 'd' ? values : undefined}
      {...props}
    />
  );
};

Animation.defaultProps = {
  delay: 0,
  duration: 250,
  callback: undefined,
  ease: 'linear',
  from: 0,
  to: 0,
};

Animation.propTypes = {
  attribute: PropTypes.string.isRequired,
  callback: PropTypes.func,
  delay: PropTypes.number,
  duration: PropTypes.number,
  ease: PropTypes.string,
  from: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  to: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Animation;
