import React, { PureComponent } from 'react';
import { arc as shape } from 'd3';
import PropTypes from 'prop-types';

import Layer from '../Layer';

class Arc extends PureComponent {
  static defaultProps = {
    color: '#222222',
    endAngle: 0,
    height: 0,
    onClick() {},
    onFocus() {},
    onMouseOver() {},
    radius: 0,
    startAngle: 0,
    thickness: 0,
    width: 0,
    x: 0,
    y: 0,
  };

  static propTypes = {
    color: PropTypes.string,
    endAngle: PropTypes.number,
    height: PropTypes.number,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onMouseOver: PropTypes.func,
    radius: PropTypes.number,
    startAngle: PropTypes.number,
    thickness: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  };

  static d({ endAngle, thickness, height, radius, startAngle, width }) {
    const outerRadius = Math.min(height / 2, width / 2);

    const arc = shape();

    if (radius) {
      arc.cornerRadius(radius);
    }

    return arc({
      endAngle: (endAngle / 360) * 2 * Math.PI,
      innerRadius: thickness ? outerRadius - thickness : 0,
      outerRadius,
      startAngle: (startAngle / 360) * 2 * Math.PI,
    });
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
    const { endAngle, height, startAngle, thickness, width } = this.props;
    const outerRadius = Math.min(height, width / 2);

    return shape().centroid({
      endAngle,
      innerRadius: outerRadius - thickness,
      outerRadius,
      startAngle,
    });
  }

  render() {
    const {
      color,
      endAngle,
      height,
      radius,
      startAngle,
      thickness,
      width,
      x,
      y,
      ...props
    } = this.props;

    const d = Arc.d({ endAngle, height, radius, startAngle, thickness, width });

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

export default Arc;
