import React from 'react'
import PropTypes, { func } from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchData } from '../Sections/actions'
import { fetchData as fetchProjects } from '../Projects/actions'
import * as actions from './actions'
import { Wrapper, ZoomButton, ZoomButtons } from './Styled'
import DndArea from '../DndArea'
import ActionsBar from '../ActionsBar'
import ProjectPicker from '../ProjectPicker'
import { ImageType, SectionType } from '../types'
import close from '../assets/close.svg'
import Constants from '../constants'
const { MAX_ZOOM_LEVEL } = Constants

class Canvas extends React.PureComponent {
  static propTypes = {
    sections: PropTypes.arrayOf(SectionType),
    images: PropTypes.arrayOf(ImageType),
    updateCanvas: PropTypes.func,
    fetchData: PropTypes.func,
    isCanvasGridView: PropTypes.bool,
    changeCanvasMode: PropTypes.func,
    updateWebview: PropTypes.func,
    editMode: PropTypes.string,
    webview: PropTypes.object,
    pins: PropTypes.array,
  }

  constructor(props) {
    super(props)
    const project_id = props.match.params.project_id;
    props.fetchData(project_id)
    props.fetchProjects()
    this.state = {
      selectedSection: null,
      zoomLevel: -10,
      project_id: project_id,
      activeImageIndex: 0,
      activeImageIndexes: {},
      showPreview: true,
    }
  }

  componentDidUpdate = (prevProps) => {
    if(this.props.match.params.project_id !== prevProps.match.params.project_id ) {
      const project_id = this.props.match.params.project_id;
      this.props.fetchData(project_id)
      this.props.fetchProjects()
      this.setState({
        selectedSection: null,
        zoomLevel: -10,
        project_id: project_id,
        activeImageIndex: 0
      })
   };
  };

  onSectionSelect = selectedSection => {
    const { activeImageIndexes } = this.state
  // check for not set up index
    const activeImageIndex =
    activeImageIndexes[selectedSection.id] === undefined
    ? 0 //selectedSection.imageIds.length - 1
    : activeImageIndexes[selectedSection.id]
      this.setState({
        selectedSection: this.props.sections.find(s => s.id === selectedSection.id),
        activeImageIndexes: { ...activeImageIndexes, [selectedSection.id]: activeImageIndex },
        activeImageIndex: activeImageIndex
      })
  }

  onChangeCanvasMode = mode => {
    this.setState({ selectedSection: null })
    this.props.changeCanvasMode(mode)
  }

  onAddPin = pin => {
    this.props.addPin(pin, this.state.project_id);
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
    this.setState({showPreview: false})
  }

  deleteImage = (id, section_id) => {
    this.setState({
      activeImageIndexes: {},
      activeImageIndex: 0
    })
    this.props.deleteImage(id, section_id);
  }

  render() {
    const {
      images,
      sections,
      updateCanvas,
      isCanvasGridView,
      editMode,
      changeCanvasGridMode,
      webview,
      pins,
      project,
      updateWebview,
      editPin,
      deletePin,
      uploadImageToPin,
      addSection,
      uploadImages,
      activeImageIndex,
      deleteSection
    } = this.props
    const { selectedSection, zoomLevel, project_id } = this.state
    const sectionName = selectedSection ? selectedSection.title || selectedSection.name : 'No section selected'
    const items = sections
      .filter(s => s.canvas && s.imageIds.length)
      .map(({ id, imageIds, posx, posy, width, height, images: images_section, thumb, type, mime }) => ({
        id,
        path: images.find(im => im.id === imageIds[this.state.activeImageIndexes[id] !== undefined? imageIds.length - 1 - this.state.activeImageIndexes[id] : imageIds.length - 1],

          ).url,
        posx,
        posy,
        width,
        height,
        thumb: images.find(im => im.id === imageIds[imageIds.length - 1]).url_thumb,
        images_section,
        mime: images.find(im => im.id === imageIds[imageIds.length - 1]).mime,
        mimeType: images.find(im => im.id === imageIds[imageIds.length - 1]).mime_type,
        imageIds
      }))

    return (
      <Wrapper>
        <ProjectPicker
          project_id={project_id}
          projects={project}
        />

        <ActionsBar
          zoomLevel={zoomLevel}
          sectionName={sectionName}
          isCanvasGridView={isCanvasGridView}
          editMode={editMode}
          onChangeCanvasView={changeCanvasGridMode}
          onChangeCanvasMode={this.onChangeCanvasMode}
          onZoomChange={zoomLevel => this.setState({ zoomLevel })}
        />

        <ZoomButtons>
          <ZoomButton onClick={() => zoomLevel > -MAX_ZOOM_LEVEL && this.onZoomChange(zoomLevel - 1)}>-</ZoomButton>
          <ZoomButton onClick={() => zoomLevel < MAX_ZOOM_LEVEL && this.onZoomChange(zoomLevel + 1)}>+</ZoomButton>
          <ZoomButton>{zoomLevel * 10 + '%'}</ZoomButton>
      </ZoomButtons>
        <DndArea
          zoomLevel={zoomLevel}
          items={items}
          onUpdate={updateCanvas}
          editMode={editMode}
          onSelect={this.onSectionSelect}
          isCanvasGridView={isCanvasGridView}
          selectedItemId={selectedSection ? selectedSection.id : null}
          webview={webview}
          onUpdateWebView={updateWebview}
          pins={pins}
          onAddPin={this.onAddPin}
          onDeletePin={deletePin}
          onEditPin={editPin}
          onUploadImageToPin={uploadImageToPin}
          project_id={project_id}
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
  ({ images, sections, isCanvasGridView, editMode, webview, pins, project }) => ({
    images,
    sections,
    isCanvasGridView,
    editMode,
    webview,
    pins,
    project
  }),
  dispatch => bindActionCreators({ ...actions, fetchData, fetchProjects }, dispatch),
)(Canvas)
