import React, { useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

import Easings from './Easings';

const FPS = 60;

export const Animation = ({
  attribute,
  delay = 0,
  duration = 250,
  ease = 'linear',
  from = 0,
  once = false,
  maxCount = once ? 1 : 0,
  to = 0,
  step = percentage => from + (to - from) * percentage,
  ...props
}) => {
  const count = useRef(0);
  const element = useRef(null);

  const isFirstRender = useRef(true);
  useLayoutEffect(() => {
    if (!maxCount || count <= maxCount) {
      if (isFirstRender.current) {
        isFirstRender.current = false;
      } else {
        element.current.beginElement();
      }
    }

    count.current += 1;
  }, [from, step, to]);

  const easing = Easings[ease] || Easings.linear;
  const seconds = duration / 1000;
  const frames = Math.round(seconds * FPS);
  const values = Array(frames)
    .fill(0)
    .map((ignore, index) => {
      const time = index / frames;

      return step(easing(time));
    })
    .join(';');

  return (
    <animate
      attributeName={attribute}
      begin={`${delay}ms`}
      dur={`${duration}ms`}
      ref={element}
      repeatCount={1}
      {...(ease !== 'linear' || attribute === 'd' ? { values } : { from, to })}
      {...props}
    />
  );
};

Animation.propTypes = {
  attribute: PropTypes.string.isRequired,
  delay: PropTypes.number,
  duration: PropTypes.number,
  ease: PropTypes.string,
  from: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxCount: PropTypes.number,
  once: PropTypes.bool,
  step: PropTypes.func,
  to: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Animation;
