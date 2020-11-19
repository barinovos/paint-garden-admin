import React, { Fragment } from 'react'
import { DropTarget } from 'react-dnd'
import PropTypes from 'prop-types'
// const
import Constants from '../../constants'
// components
import ResizableImage from '../ResizableImage'
import CanvasImage from '../CanvasImage'
import Pins from '../../Pins'
import UploadArea from '../../UploadArea'
// utils
import { calcSizeWithZoom, canvasTopOffset, canvasLeftOffset } from '../../utils/calcZoom'
// styled
import { Area, InnerArea, PreviewLink, Link } from './Styled'

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
    sections: PropTypes.arrayOf(PropTypes.object).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    selectedItemId: PropTypes.string,
    zoomLevel: PropTypes.number,
    connectDropTarget: PropTypes.func,
    isCanvasGridView: PropTypes.bool,
    editMode: PropTypes.string,
    onResize: PropTypes.func,
    pins: PropTypes.array,
    onAddPin: PropTypes.func,
    onDeletePin: PropTypes.func,
    onEditPin: PropTypes.func,
    onUploadImageToPin: PropTypes.func,
    project_id: PropTypes.string,
    c: PropTypes.func,
  }

  render() {
    const {
      sections,
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
      onChangeActiveImageIndex,
      // hidePreview,
      showPreview,
      deleteSection,
      deleteImage,
    } = this.props

    return (
      <Area isGrid={isCanvasGridView} ref={instance => connectDropTarget(instance)}>
        <InnerArea>
          {editMode === EDIT_MODES.resize &&
            sections.map((item, i) => (
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
                editMode={editMode}
              />
              {sections.map((item, i) => (
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
              <UploadArea addUpload={addSection} zoomLevel={zoomLevel} project_id={project_id} />
              {sections.map((item, i) => (
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
              {sections.map((item, i) => (
                <CanvasImage
                  key={i}
                  item={item}
                  onSelect={onSelect}
                  selectedItemId={selectedItemId}
                  zoomLevel={zoomLevel}
                  showRibbon={item.id === selectedItemId}
                  uploadImages={uploadImages}
                  project_id={project_id}
                  onChangeActiveImageIndex={onChangeActiveImageIndex}
                  deleteSection={deleteSection}
                  deleteImage={deleteImage}
                />
              ))}
            </Fragment>
          )}
        </InnerArea>
        {showPreview && (
          <PreviewLink>
            Your canvas is published here:
            <Link href={'//paint.garden/#/' + project_id} target="_blank">
              paint.garden/{project_id}
            </Link>
          </PreviewLink>
        )}
      </Area>
    )
  }
}

export default DropTarget('any', squareTarget, collect)(DndArea)
