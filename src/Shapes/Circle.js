import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class Circle extends PureComponent {
  static defaultProps = {
    onClick() {},
    onFocus() {},
    onMouseOver() {},
    radius: 1,
    x: 0,
    y: 0,
  };

  static propTypes = {
    color: PropTypes.string,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onMouseOver: PropTypes.func,
    radius: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  };

  handleClick = event => {
    const { onClick, radius, x, y } = this.props;

    // eslint-disable-next-line no-param-reassign
    event.shape = {
      centroid: [(x + radius) / 2, (y + radius) / 2],
      radius,
      x,
      y,
    };

    onClick(event);
  };

  handleFocus = event => {
    const { onFocus, radius, x, y } = this.props;

    // eslint-disable-next-line no-param-reassign
    event.shape = {
      centroid: [(x + radius) / 2, (y + radius) / 2],
      radius,
      x,
      y,
    };

    onFocus(event);
  };

  handleMouseOver = event => {
    const { onMouseOver, radius, x, y } = this.props;

    // eslint-disable-next-line no-param-reassign
    event.shape = {
      centroid: [(x + radius) / 2, (y + radius) / 2],
      radius,
      x,
      y,
    };

    onMouseOver(event);
  };

  render() {
    const { color, radius, x, y, ...props } = this.props;

    return (
      <circle
        cx={x}
        cy={y}
        fill={color}
        r={radius}
        {...props}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        onMouseOver={this.handleMouseOver}
      />
    );
  }
}

export default Circle;
