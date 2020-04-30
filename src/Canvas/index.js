import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchData } from '../Sections/actions'
import * as actions from './actions'
import { Wrapper } from './Styled'
import DndArea from '../DndArea'
import ActionsBar from '../ActionsBar'
import { ImageType, SectionType } from '../types'

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
    this.state = {
      selectedSection: null,
      zoomLevel: 0,
      project_id: project_id
    }
  }

  onSectionSelect = sId => this.setState({ selectedSection: this.props.sections.find(s => s.id === sId) })

  onChangeCanvasMode = mode => {
    this.setState({ selectedSection: null })
    this.props.changeCanvasMode(mode)
  }

  onAddPin = pin => {
    console.log(this.state);
    this.props.addPin(pin, this.state.project_id);
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
      updateWebview,
      editPin,
      deletePin,
      uploadImageToPin,
    } = this.props
    const { selectedSection, zoomLevel } = this.state
    const sectionName = selectedSection ? selectedSection.title || selectedSection.name : 'No section selected'
    const items = sections
      .filter(s => s.canvas && s.imageIds.length)
      .map(({ id, imageIds, posx, posy, width, height, thumb, type, mime }) => ({
        id,
        path: images.find(im => im.id === imageIds[imageIds.length - 1]).url,
        posx,
        posy,
        width,
        height,
        thumb: images.find(im => im.id === imageIds[imageIds.length - 1]).url_thumb,
        mime: images.find(im => im.id === imageIds[imageIds.length - 1]).mime,
        mimeType: images.find(im => im.id === imageIds[imageIds.length - 1]).mime_type,
      }))

    return (
      console.log(items),
      <Wrapper>
        <ActionsBar
          zoomLevel={zoomLevel}
          sectionName={sectionName}
          isCanvasGridView={isCanvasGridView}
          editMode={editMode}
          onChangeCanvasView={changeCanvasGridMode}
          onChangeCanvasMode={this.onChangeCanvasMode}
          onZoomChange={zoomLevel => this.setState({ zoomLevel })}
        />
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
        />
      </Wrapper>
    )
  }
}

export default connect(
  ({ images, sections, isCanvasGridView, editMode, webview, pins }) => ({
    images,
    sections,
    isCanvasGridView,
    editMode,
    webview,
    pins,
  }),
  dispatch => bindActionCreators({ ...actions, fetchData }, dispatch),
)(Canvas)
