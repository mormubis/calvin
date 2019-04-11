import React, { PureComponent, createRef } from 'react';
import { line as shape } from 'd3';
import PropTypes from 'prop-types';

import Curves from '../Curves';
import Layer from '../Layer';

class Line extends PureComponent {
  static defaultProps = {
    color: '#222222',
    onClick() {},
    onFocus() {},
    onMouseOver() {},
    points: [],
    thickness: 0,
    x: 0,
    y: 0,
  };

  static propTypes = {
    color: PropTypes.string,
    curve: PropTypes.string,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onMouseOver: PropTypes.func,
    points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    thickness: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  };

  static d({ curve, points }) {
    const line = shape();

    if (curve) {
      line.curve(Curves[curve]);
    }

    return line(points);
  }

  element = createRef();

  handleClick = event => {
    const { onClick, thickness, x, y } = this.props;

    // eslint-disable-next-line no-param-reassign
    event.shape = {
      length: this.length(),
      thickness,
      x,
      y,
    };

    onClick(event);
  };

  handleFocus = event => {
    const { onFocus, thickness, x, y } = this.props;

    // eslint-disable-next-line no-param-reassign
    event.shape = {
      length: this.length(),
      thickness,
      x,
      y,
    };

    onFocus(event);
  };

  handleMouseOver = event => {
    const { onMouseOver, thickness, x, y } = this.props;

    // eslint-disable-next-line no-param-reassign
    event.shape = {
      length: this.length(),
      thickness,
      x,
      y,
    };

    onMouseOver(event);
  };

  length() {
    return this.element.current ? this.element.current.getTotalLength() : 0;
  }

  render() {
    const { color, curve, points, thickness, x, y, ...props } = this.props;

    const d = Line.d({ curve, points });

    return (
      <Layer x={x} y={y}>
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={thickness}
          {...props}
          d={d}
          fill="none"
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          onMouseOver={this.handleMouseOver}
          ref={this.element}
        />
      </Layer>
    );
  }
}

export default Line;
