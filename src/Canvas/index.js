import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchData as fetchProjects } from '../Projects/actions'
import * as actions from './actions'
import { Wrapper } from './Styled'
import DndArea from '../DndArea'
import Zoom from '../newComponents/NewZoom'
import ActionsBar from '../newComponents/ActionsBarNew'
import Dialogue from '../newComponents/DialogueNew'
import ProjectHeader from '../newComponents/ProjectPickerNew'
import Constants from '../constants'
import DropzoneArea from '../newComponents/DropzoneArea'

const { MAX_ZOOM_LEVEL } = Constants

class Canvas extends React.PureComponent {
  static propTypes = {
    activeCanvas: PropTypes.object,
    updateCanvas: PropTypes.func,
    fetchCanvasData: PropTypes.func,
    isCanvasGridView: PropTypes.bool,
    changeCanvasMode: PropTypes.func,
    editMode: PropTypes.string,
    pins: PropTypes.array,
    user: PropTypes.object,
  }

  constructor(props) {
    super(props)
    const canvasId = props.match.params.canvasId
    props.fetchCanvasData(canvasId)
    props.fetchProjects()
    this.state = {
      selectedSection: null,
      zoomLevel: 0,
      canvasId,
      activeImageIndex: 0,
      activeImageIndexes: {},
      showPreview: true,
    }
  }

  componentDidUpdate = prevProps => {
    if (this.props.match.params.canvasId !== prevProps.match.params.canvasId) {
      const canvasId = this.props.match.params.canvasId
      this.props.fetchCanvasData(canvasId)
      // this.props.fetchProjects()
      this.setState({
        selectedSection: null,
        zoomLevel: 0,
        canvasId,
        activeImageIndex: 0,
      })
    }
  }

  onSectionSelect = selectedSection => {
    const { activeImageIndexes } = this.state
    // check for not set up index
    const activeImageIndex =
      activeImageIndexes[selectedSection.id] === undefined
        ? 0 //selectedSection.imageIds.length - 1
        : activeImageIndexes[selectedSection.id]
    this.setState({
      selectedSection: this.props.activeCanvas.sections.find(s => s.id === selectedSection.id),
      activeImageIndexes: { ...activeImageIndexes, [selectedSection.id]: activeImageIndex },
      activeImageIndex: activeImageIndex,
    })
  }

  onChangeCanvasMode = mode => {
    this.setState({ selectedSection: null })
    this.props.changeCanvasMode(mode)
  }

  onAddPin = pin => {
    this.props.addPin(pin, this.state.canvasId)
  }

  onZoomChange = zoomLevel => {
    this.setState({ zoomLevel })
  }

  onChangeActiveImageIndex = index => {
    const { selectedSection, activeImageIndexes } = this.state
    this.setState({
      activeImageIndexes: { ...activeImageIndexes, [selectedSection.id]: +index },
    })
  }

  changeShowPreview = () => {
    this.setState({ showPreview: false })
  }

  deleteImage = (id, section_id) => {
    this.setState({
      activeImageIndexes: {},
      activeImageIndex: 0,
    })
    this.props.deleteImage(id, section_id)
  }

  render() {
    const {
      activeCanvas,
      updateCanvas,
      isCanvasGridView,
      editMode,
      changeCanvasGridMode,
      pins,
      projects,
      editPin,
      deletePin,
      uploadImageToPin,
      addSection,
      uploadImages,
      activeImageIndex,
      deleteSection,
    } = this.props

    if (!activeCanvas) {
      return 'Loading canvas data...'
    }
    const { selectedSection, zoomLevel, canvasId } = this.state

    const sectionName = selectedSection ? selectedSection.title || selectedSection.name : 'No section selected'

    const items = activeCanvas.sections
    /*.map(({ id, imageIds, posx, posy, width, height, images: images_section }) => ({
        id,
        path: images.find(
          im =>
            im.id ===
            imageIds[
              this.state.activeImageIndexes[id] !== undefined
                ? imageIds.length - 1 - this.state.activeImageIndexes[id]
                : imageIds.length - 1
            ],
        ).url,
        posx,
        posy,
        width,
        height,
        thumb: images.find(im => im.id === imageIds[imageIds.length - 1]).url_thumb,
        images_section,
        mime: images.find(im => im.id === imageIds[imageIds.length - 1]).mime,
        mimeType: images.find(im => im.id === imageIds[imageIds.length - 1]).mime_type,
        imageIds,
      }))*/

    const itemsUploaded = activeCanvas.sections.length
    // NO ITEMS UPLOADED, SO SHOW THIS

    if (!itemsUploaded) {
      return (
        <Wrapper>
          <ProjectHeader projectId={canvasId} projects={projects} />
          <DropzoneArea projectId={activeCanvas.project_id} canvasId={canvasId} userId={this.props.user.id} />
        </Wrapper>
      )
    }
    // ITEMS UPLOADED SO SHOW THIS
    return (
      <Wrapper>
        {/* Name to be changed since it's now a header */}
        <ProjectHeader projectId={canvasId} projects={projects} />

        <Dialogue />

        <ActionsBar
          zoomLevel={zoomLevel}
          sectionName={sectionName}
          isCanvasGridView={isCanvasGridView}
          editMode={editMode}
          onChangeCanvasView={changeCanvasGridMode}
          onChangeCanvasMode={this.onChangeCanvasMode}
          onZoomChange={zoomLevel => this.setState({ zoomLevel })}
        />

        <Zoom
          onClickPlus={() => zoomLevel < MAX_ZOOM_LEVEL && this.onZoomChange(zoomLevel + 1)}
          onClickMinus={() => zoomLevel > -MAX_ZOOM_LEVEL && this.onZoomChange(zoomLevel - 1)}
          zoomLevel={zoomLevel}
        />

        <DndArea
          zoomLevel={zoomLevel}
          items={items}
          onUpdate={updateCanvas}
          editMode={editMode}
          onSelect={this.onSectionSelect}
          isCanvasGridView={isCanvasGridView}
          selectedItemId={selectedSection ? selectedSection.id : null}
          pins={pins}
          onAddPin={this.onAddPin}
          onDeletePin={deletePin}
          onEditPin={editPin}
          onUploadImageToPin={uploadImageToPin}
          project_id={canvasId}
          addSection={addSection}
          uploadImages={uploadImages}
          activeImageIndex={activeImageIndex}
          onChangeActiveImageIndex={this.onChangeActiveImageIndex}
          hidePreview={this.changeShowPreview}
          showPreview={this.state.showPreview}
          deleteSection={deleteSection}
          deleteImage={this.deleteImage}
        />
      </Wrapper>
    )
  }
}

export default connect(
  ({ activeCanvas, isCanvasGridView, editMode, pins, projects, user }) => ({
    activeCanvas,
    isCanvasGridView,
    editMode,
    pins,
    projects,
    user,
  }),
  dispatch => bindActionCreators({ ...actions, fetchProjects }, dispatch),
)(Canvas)
