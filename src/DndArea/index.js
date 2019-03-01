import React from 'react'
import PropTypes from 'prop-types'
import { Area } from './Styled'
import { DropTarget } from 'react-dnd'
import DragImage from '../DragImage'
import { reCalcSizeWithZoom, canvasTopOffset, canvasLeftOffset } from '../utils/calcZoom'

const squareTarget = {
  drop(props, monitor) {
    const sourceOffset = monitor.getSourceClientOffset()
    const item = monitor.getItem()
    const zoomLevel = props.zoomLevel
    props.onDropImage(item.id, {
      x: reCalcSizeWithZoom(sourceOffset.x - canvasLeftOffset, zoomLevel),
      y: reCalcSizeWithZoom(sourceOffset.y - canvasTopOffset, zoomLevel),
      width: item.width,
      height: item.height,
      depth: item.depth,
    })
  },
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}

class DndArea extends React.PureComponent {
  static propTypes = {
    dndItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDropImage: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    selectedItemId: PropTypes.string,
    zoomLevel: PropTypes.number,
    connectDropTarget: PropTypes.func,
  }

  render() {
    const { dndItems, connectDropTarget, onSelect, selectedItemId, zoomLevel } = this.props

    return (
      <Area ref={instance => connectDropTarget(instance)}>
        {dndItems.map((item, i) => (
          <DragImage key={i} item={item} onSelect={onSelect} selectedItemId={selectedItemId} zoomLevel={zoomLevel} />
        ))}
      </Area>
    )
  }
}

export default DropTarget('any', squareTarget, collect)(DndArea)
