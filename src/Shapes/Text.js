import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Layer from '../Layer';

const TEXT = {
  center: 'middle',
  left: 'start',
  right: 'end',
};

const VERTICAL = {
  baseline: 'baseline',
  middle: 'central',
  top: 'hanging',
};

export class Text extends PureComponent {
  static defaultProps = {
    children: undefined,
    color: undefined,
    onClick() {},
    onFocus() {},
    onMouseOver() {},
    textAlign: 'center',
    verticalAlign: 'center',
    x: 0,
    y: 0,
  };

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    color: PropTypes.string,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onMouseOver: PropTypes.func,
    textAlign: PropTypes.oneOf(['center', 'left', 'right']),
    verticalAlign: PropTypes.oneOf(['baseline', 'middle', 'top']),
    x: PropTypes.number,
    y: PropTypes.number,
  };

  handleClick = event => {
    const { onClick, x, y } = this.props;

    // eslint-disable-next-line no-param-reassign
    event.shape = {
      x,
      y,
    };

    onClick(event);
  };

  handleFocus = event => {
    const { onFocus, x, y } = this.props;

    // eslint-disable-next-line no-param-reassign
    event.shape = {
      x,
      y,
    };

    onFocus(event);
  };

  handleMouseOver = event => {
    const { onMouseOver, x, y } = this.props;

    // eslint-disable-next-line no-param-reassign
    event.shape = {
      x,
      y,
    };

    onMouseOver(event);
  };

  render() {
    const { color, textAlign, verticalAlign, x, y, ...props } = this.props;

    return (
      <Layer x={x} y={y}>
        <text
          alignmentBaseline={VERTICAL[verticalAlign]}
          dominantBaseline={VERTICAL[verticalAlign]}
          fill={color}
          textAnchor={TEXT[textAlign]}
          {...props}
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          onMouseOver={this.handleMouseOver}
        />
      </Layer>
    );
  }
}

export default Text;
