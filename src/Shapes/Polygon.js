import React, { PureComponent } from 'react';
import { polygonArea as shape, polygonCentroid as centroid } from 'd3';
import PropTypes from 'prop-types';

import Layer from '../Layer';

export class Polygon extends PureComponent {
  static defaultProps = {
    color: '#222222',
    onClick() {},
    onFocus() {},
    onMouseOver() {},
    points: [],
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
    x: PropTypes.number,
    y: PropTypes.number,
  };

  static d({ points = [] }) {
    return shape(points);
  }

  handleClick = event => {
    const { onClick, x, y } = this.props;

    // eslint-disable-next-line no-param-reassign
    event.shape = {
      centroid: this.centroid(),
      x,
      y,
    };

    onClick(event);
  };

  handleFocus = event => {
    const { onFocus, x, y } = this.props;

    // eslint-disable-next-line no-param-reassign
    event.shape = {
      centroid: this.centroid(),
      x,
      y,
    };

    onFocus(event);
  };

  handleMouseOver = event => {
    const { onMouseOver, x, y } = this.props;

    // eslint-disable-next-line no-param-reassign
    event.shape = {
      centroid: this.centroid(),
      x,
      y,
    };

    onMouseOver(event);
  };

  centroid() {
    const { points } = this.props;

    return centroid(points);
  }

  render() {
    const { color, curve, points, x, y, ...props } = this.props;

    const d = Polygon.d({ curve, points });

    return (
      <Layer x={x} y={y}>
        <path
          fill={color}
          {...props}
          d={d}
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          onMouseOver={this.handleMouseOver}
        />
      </Layer>
    );
  }
}

export default Polygon;
