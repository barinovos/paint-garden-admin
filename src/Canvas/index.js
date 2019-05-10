import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchData } from '../Sections/actions'
import { changeCanvasMode, changeCanvasGridMode, updateCanvas, addPin, deletePin, updateWebview } from './actions'
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
    editMode: PropTypes.string,
    webview: PropTypes.object,
    pins: PropTypes.array,
  }

  constructor(props) {
    super(props)
    props.fetchData()
    this.state = {
      selectedSection: null,
      zoomLevel: 0,
    }
  }

  onSectionSelect = sId => this.setState({ selectedSection: this.props.sections.find(s => s.id === sId) })

  render() {
    const {
      images,
      sections,
      updateCanvas,
      isCanvasGridView,
      changeCanvasMode,
      editMode,
      changeCanvasGridMode,
      webview,
      pins,
    } = this.props
    const { selectedSection, zoomLevel } = this.state
    const sectionName = selectedSection ? selectedSection.name : 'No section selected'
    const items = sections
      .filter(s => s.canvas && s.imageIds.length)
      .map(s => ({
        id: s.id,
        path: images.find(im => im.id === s.imageIds[s.imageIds.length - 1]).filePath,
        ...s.canvas,
      }))

    return (
      <Wrapper>
        <ActionsBar
          zoomLevel={zoomLevel}
          sectionName={sectionName}
          isCanvasGridView={isCanvasGridView}
          editMode={editMode}
          onChangeCanvasView={changeCanvasGridMode}
          onChangeCanvasMode={changeCanvasMode}
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
          onAddPin={addPin}
          onDeletePin={deletePin}
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
  dispatch => bindActionCreators({ updateCanvas, fetchData, changeCanvasMode, changeCanvasGridMode }, dispatch),
)(Canvas)
