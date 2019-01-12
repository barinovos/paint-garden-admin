import React from 'react';
import PropTypes from 'prop-types';
import { Area } from './Styled';
import { DropTarget } from 'react-dnd';
import DragImage from '../DragImage';

const canvasTopOffset = 127;
const canvasLeftOffset = 50;

const squareTarget = {
  drop(props, monitor) {
    const sourceOffset = monitor.getSourceClientOffset();
    props.onDropImage(monitor.getItem().id, {
      x: sourceOffset.x - canvasLeftOffset,
      y: sourceOffset.y - canvasTopOffset
    })
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class DndArea extends React.PureComponent {
  static propTypes = {
    canvas: PropTypes.object.isRequired,
    onDropImage: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func
  };

  render() {
    const { canvas, connectDropTarget } = this.props;
    const ids = Object.keys(canvas) || [];
    const images = ids.map(id => canvas[id]);

    return (
      <Area ref={instance => connectDropTarget(instance)}>
        {images.map((item, i) => <DragImage key={i} item={item} itemId={ids[i]}/>)}
      </Area>
    )
  }
}

export default DropTarget('any', squareTarget, collect)(DndArea);
