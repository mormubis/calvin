import React from 'react';
import PropTypes from 'prop-types';

import Easings from './Easings';

const FPS = 60;

export const Animation = ({
  attribute,
  delay,
  duration,
  ease,
  from,
  step,
  to,
  ...props
}) => {
  const easing = Easings[ease] || Easings.linear;
  const seconds = duration / 1000;
  const frames = Math.round(seconds / FPS);
  const values = Array(frames)
    .fill(0)
    .map((ignore, index) => {
      const time = index / frames;

      return step(easing(time), from, to);
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
  ease: 'linear',
  from: 0,
  step(percentage, from, to) {
    return from + (to - from) * percentage;
  },
  to: 0,
};

Animation.propTypes = {
  attribute: PropTypes.string.isRequired,
  delay: PropTypes.number,
  duration: PropTypes.number,
  ease: PropTypes.string,
  from: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  step: PropTypes.func,
  to: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Animation;
