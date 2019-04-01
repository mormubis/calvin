import React, { PureComponent } from 'react';
import { arc as shape } from 'd3';
import PropTypes from 'prop-types';

import Layer from '../Layer';

export class Arc extends PureComponent {
  static defaultProps = {
    color: undefined,
    endAngle: 0,
    gauge: 0,
    height: 0,
    onClick() {},
    onFocus() {},
    onMouseOver() {},
    radius: 0,
    startAngle: 0,
    width: 0,
    x: 0,
    y: 0,
  };

  static propTypes = {
    color: PropTypes.string,
    endAngle: PropTypes.number,
    gauge: PropTypes.number,
    height: PropTypes.number,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onMouseOver: PropTypes.func,
    radius: PropTypes.number,
    startAngle: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  };

  static d({ endAngle, gauge, height, radius, startAngle, width }) {
    const outerRadius = Math.min(height, width / 2);

    const arc = shape();

    if (radius) {
      arc.cornerRadius(radius);
    }

    return arc({
      endAngle: (endAngle / 360) * 2 * Math.PI,
      innerRadius: gauge ? outerRadius - gauge : 0,
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
    const { endAngle, gauge, height, startAngle, width } = this.props;
    const outerRadius = Math.min(height, width / 2);

    return shape().centroid({
      endAngle,
      innerRadius: outerRadius - gauge,
      outerRadius,
      startAngle,
    });
  }

  render() {
    const {
      color,
      endAngle,
      gauge,
      height,
      radius,
      startAngle,
      width,
      x,
      y,
      ...props
    } = this.props;

    const d = Arc.d({ endAngle, gauge, height, radius, startAngle, width });

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
