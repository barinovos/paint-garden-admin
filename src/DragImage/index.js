import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
import { Image } from './Styled';
import { DragSource } from 'react-dnd';

const BASIC_WIDTH = 300;

const source = {
  beginDrag(props) {
    return { id: props.itemId };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class DndArea extends React.PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    itemId: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func
  };

  render() {
    const { item, connectDragSource } = this.props;
    const ratio = item.height / item.width;
    const height = BASIC_WIDTH * ratio;

    return (
      <Image
        src={api.getImageUrl(item.path)}
        alt={''}
        top={item.y}
        left={item.x}
        width={BASIC_WIDTH}
        height={height}
        ref={instance => connectDragSource(instance)}/>
    )
  }
}

export default DragSource('any', source, collect)(DndArea);
