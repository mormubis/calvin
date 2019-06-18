import React, { useRef, useLayoutEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';

import Easings from './Easings';

const FPS = 60;

const Animation = ({
  attribute,
  delay = 0,
  duration = 250,
  ease = 'linear',
  forwardedRef,
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
      ref={node => {
        element.current = node;

        if (forwardedRef) {
          // eslint-disable-next-line no-param-reassign
          forwardedRef.current = node;
        }
      }}
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
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  from: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxCount: PropTypes.number,
  once: PropTypes.bool,
  step: PropTypes.func,
  to: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default forwardRef((props, ref) => (
  <Animation {...props} forwardedRef={ref} />
));
