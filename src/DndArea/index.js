import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Area, InnerArea, UploadWrapper } from './Styled'
import { DropTarget } from 'react-dnd'
import DragImage from '../DragImage'
import ResizableImage from '../ResizableImage'
import CanvasImage from '../CanvasImage'
import UploadRibbon from '../UploadRibbon'
import Pins from '../Pins'
import { calcSizeWithZoom, canvasTopOffset, canvasLeftOffset } from '../utils/calcZoom'
import Constants from '../constants'
import UploadArea from '../UploadArea'
const { EDIT_MODES } = Constants

const squareTarget = {
  drop(props, monitor) {
    const sourceOffset = monitor.getSourceClientOffset()
    const item = monitor.getItem()
    const zoomLevel = props.zoomLevel
    const x = calcSizeWithZoom(sourceOffset.x - canvasLeftOffset, zoomLevel)
    const y = calcSizeWithZoom(sourceOffset.y - canvasTopOffset, zoomLevel)
    props.onUpdate(item.id, {
      posx: Math.floor(x),
      posy: Math.floor(y),
      width: Math.floor(item.width),
      height: Math.floor(item.height),
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
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    selectedItemId: PropTypes.string,
    zoomLevel: PropTypes.number,
    connectDropTarget: PropTypes.func,
    isCanvasGridView: PropTypes.bool,
    editMode: PropTypes.string,
    onResize: PropTypes.func,
    webview: PropTypes.object,
    pins: PropTypes.array,
    onUpdateWebView: PropTypes.func,
    onAddPin: PropTypes.func,
    onDeletePin: PropTypes.func,
    onEditPin: PropTypes.func,
    onUploadImageToPin: PropTypes.func,
    project_id: PropTypes.string,
    c: PropTypes.func
  }

  render() {
    const {
      items,
      connectDropTarget,
      onSelect,
      selectedItemId,
      zoomLevel,
      isCanvasGridView,
      editMode,
      onUpdate,
      pins,
      onAddPin,
      onDeletePin,
      onEditPin,
      onUploadImageToPin,
      project_id,
      addSection,
      uploadImages,
      onChangeActiveImageIndex
    } = this.props

    return (
      <Area isGrid={isCanvasGridView} ref={instance => connectDropTarget(instance)}>
        <InnerArea >
          {editMode === EDIT_MODES.resize &&
            items.map((item, i) => (
              <ResizableImage
                key={i}
                item={item}
                onSelect={onSelect}
                selectedItemId={selectedItemId}
                zoomLevel={zoomLevel}
                onResize={onUpdate}
                onDrop={onUpdate}
              />
            ))}
          {editMode === EDIT_MODES.annotation && (
            <Fragment>
              <Pins
                pins={pins}
                addPin={onAddPin}
                editPin={onEditPin}
                deletePin={onDeletePin}
                uploadImage={onUploadImageToPin}
                zoomLevel={zoomLevel}
              />
              {items.map((item, i) => (
                <CanvasImage
                  key={i}
                  item={item}
                  onSelect={onSelect}
                  selectedItemId={selectedItemId}
                  zoomLevel={zoomLevel}
                />
              ))}
            </Fragment>
          )}

          {editMode === EDIT_MODES.area && (
              <Fragment>
                <UploadArea
                  addUpload={addSection}
                  zoomLevel={zoomLevel}
                  project_id={project_id}
                />
                {items.map((item, i) => (
                  <CanvasImage
                    key={i}
                    item={item}
                    onSelect={onSelect}
                    selectedItemId={selectedItemId}
                    zoomLevel={zoomLevel}
                  />
                ))}
              </Fragment>
          )}


          {editMode === EDIT_MODES.upload && (
              <Fragment>
                {items.map((item, i) => (
                    <CanvasImage
                      key={i}
                      item={item}
                      onSelect={onSelect}
                      selectedItemId={selectedItemId}
                      zoomLevel={zoomLevel}
                      showRibbon= {item.id === selectedItemId}
                      uploadImages={uploadImages}
                      project_id={project_id}
                      onChangeActiveImageIndex={onChangeActiveImageIndex}
                    />
                  ))}
              </Fragment>
          )}
        </InnerArea>
      </Area>
    )
  }
}

export default DropTarget('any', squareTarget, collect)(DndArea)
