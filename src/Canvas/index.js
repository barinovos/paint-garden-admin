import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchData as fetchProjects } from '../Projects/actions'
import * as actions from './actions'
import { Wrapper } from './Styled'
import DndArea from './DndArea'
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
    updateSection: PropTypes.func,
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
      updateSection,
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

    const d = {
      data: {
        id: '92627a6a-0e3a-484a-ae18-b9df958227e1',
        title: 'Another cool one man',
        project_id: '0f75d975-e398-4cbb-92a8-8fa5607f5e69',
        created_at: '2020-11-14T13:54:14.000000Z',
        user: {
          id: 14,
          name: 'Oleg Barinov',
          profile_photo_url: 'https://ui-avatars.com/api/?name=Oleg+Barinov&color=7F9CF5&background=EBF4FF',
          avatar: 'https://paint-garden-live.s3.eu-central-1.amazonaws.com/users/default.png',
          email: 'barinovos@gmail.com',
        },
        is_me: true,
        meta_data: '[]',
        sections: [
          {
            id: '2af96f29-cc1e-4427-a772-e5dea121f7fd',
            title: null,
            project_id: '0f75d975-e398-4cbb-92a8-8fa5607f5e69',
            canvas_id: '92627a6a-0e3a-484a-ae18-b9df958227e1',
            position: { x: 0, y: 0 },
            dimensions: { width: 874, height: 1214 },
            meta_data: [],
            media: {
              id: 1,
              model_id: '2af96f29-cc1e-4427-a772-e5dea121f7fd',
              model_type: 'App\\Models\\Section',
              uuid: '1d2e0f00-7aae-4d08-ab4d-49b75d874e25',
              collection_name: 'sections',
              name: 'Screenshot 2020-11-12 at 17.07.23',
              mime_type: 'image/png',
              size: 184959,
              url:
                'https://paint-garden-live.s3.eu-central-1.amazonaws.com/media-v2/1/ebdb9d17-2bfa-46cb-bcd3-81c5f7e21537.png',
              thumb:
                'https://paint-garden-live.s3.eu-central-1.amazonaws.com/media-v2/1/conversions/ebdb9d17-2bfa-46cb-bcd3-81c5f7e21537-thumb.jpg',
              custom_properties: {
                width: 874,
                height: 1214,
                generated_conversions: { W_800: true, thumb: true, W_1200: true },
              },
              created_at: '2020-11-16T20:50:28.000000Z',
            },
            history: [
              {
                id: 1,
                model_id: '2af96f29-cc1e-4427-a772-e5dea121f7fd',
                model_type: 'App\\Models\\Section',
                uuid: '1d2e0f00-7aae-4d08-ab4d-49b75d874e25',
                collection_name: 'sections',
                name: 'Screenshot 2020-11-12 at 17.07.23',
                mime_type: 'image/png',
                size: 184959,
                url:
                  'https://paint-garden-live.s3.eu-central-1.amazonaws.com/media-v2/1/ebdb9d17-2bfa-46cb-bcd3-81c5f7e21537.png',
                thumb:
                  'https://paint-garden-live.s3.eu-central-1.amazonaws.com/media-v2/1/conversions/ebdb9d17-2bfa-46cb-bcd3-81c5f7e21537-thumb.jpg',
                custom_properties: {
                  width: 874,
                  height: 1214,
                  generated_conversions: { W_800: true, thumb: true, W_1200: true },
                },
                created_at: '2020-11-16T20:50:28.000000Z',
              },
            ],
            annotations: [],
          },
        ],
      },
    }

    // NO ITEMS UPLOADED, SO SHOW THIS
    if (!activeCanvas.sections.length) {
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
          sections={activeCanvas.sections}
          onUpdate={updateSection}
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
