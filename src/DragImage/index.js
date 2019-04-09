import React from 'react'
import PropTypes from 'prop-types'
import api from '../utils/api'
import { Image } from '../Common/Styled'
import { DragSource } from 'react-dnd'
import { calcSizeWithZoom } from '../utils/calcZoom'

const source = {
  beginDrag(props) {
    return props.item
  },
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

class DndArea extends React.PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    selectedItemId: PropTypes.string,
    zoomLevel: PropTypes.number,
    connectDragSource: PropTypes.func,
  }

  render() {
    const { item, connectDragSource, onSelect, selectedItemId, zoomLevel } = this.props
    const height = calcSizeWithZoom(item.height, zoomLevel)
    const width = calcSizeWithZoom(item.width, zoomLevel)
    const x = calcSizeWithZoom(item.x, zoomLevel)
    const y = calcSizeWithZoom(item.y, zoomLevel)

    return (
      <Image
        src={api.getImageUrl(item.path)}
        isSelected={selectedItemId === item.id}
        alt={''}
        top={y}
        left={x}
        width={width}
        height={height}
        onClick={() => onSelect(item.id)}
        ref={instance => connectDragSource(instance)}
      />
    )
  }
}

export default DragSource('any', source, collect)(DndArea)
