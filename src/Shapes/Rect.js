import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Rect extends PureComponent {
  static defaultProps = {
    color: '#222222',
    height: 0,
    onClick() {},
    onFocus() {},
    onMouseOver() {},
    radius: 0,
    width: 0,
    x: 0,
    y: 0,
  };

  static propTypes = {
    color: PropTypes.string,
    height: PropTypes.number,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onMouseOver: PropTypes.func,
    radius: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  };

  handleClick = event => {
    const { height, onClick, width, x, y } = this.props;

    // eslint-disable-next-line no-param-reassign
    event.shape = {
      centroid: [x + width / 2, y + height],
      height,
      width,
      x,
      y,
    };

    onClick(event);
  };

  handleFocus = event => {
    const { height, onFocus, width, x, y } = this.props;

    // eslint-disable-next-line no-param-reassign
    event.shape = {
      centroid: [x + width / 2, y + height],
      height,
      width,
      x,
      y,
    };

    onFocus(event);
  };

  handleMouseOver = event => {
    const { height, onMouseOver, width, x, y } = this.props;

    // eslint-disable-next-line no-param-reassign
    event.shape = {
      centroid: [x + width / 2, y + height],
      height,
      width,
      x,
      y,
    };

    onMouseOver(event);
  };

  render() {
    const { color, radius, ...props } = this.props;

    return (
      <rect
        fill={color}
        rx={radius}
        {...props}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        onMouseOver={this.handleMouseOver}
      />
    );
  }
}

export default Rect;
