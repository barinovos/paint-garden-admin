import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import { fetchAnnotations, selectAnnotation } from '../Annotations/actions'
import { Wrapper, InnerArea, Link, PreviewLink } from './Styled'
import Zoom from './Zoom'
import ActionsBar from './ActionsBar'
import Comments from './Comments'
import CanvasHeader from './CanvasHeader'
import Constants from '../constants'
import DropzoneArea from './DropzoneArea'
import ResizableImage from './ResizableImage'
import Annotations from '../Annotations'
import CanvasImage from './CanvasImage'
import UploadViaUrl from './UploadViaUrl'
import PageLoader from '../components/PageLoader'
import { getPosition } from '../utils/calcZoom'

const { MAX_ZOOM_LEVEL, EDIT_MODES } = Constants

const Canvas = ({
  activeCanvas,
  updateSection,
  editMode,
  annotations,
  user,
  sections,
  addSection,
  uploadMediaToSection,
  deleteSection,
  deleteImage,
  changeCanvasMode,
  match,
  fetchCanvasData,
  fetchAnnotations,
  resetCanvasData,
  selectAnnotation,
  activePin,
  zoom,
  setZoom,
}) => {
  const [selectedSection, setSelectedSection] = useState(null)
  const [showUploadUrlModal, setShowUploadUrlModal] = useState(false)
  const [autoAdjust, setAutoAdjust] = useState(false)

  useEffect(() => {
    fetchCanvasData(match.params.canvasId)
    fetchAnnotations(match.params.canvasId)
    return resetCanvasData
  }, [match, fetchCanvasData, resetCanvasData, fetchAnnotations])

  if (!activeCanvas) {
    return <PageLoader />
  }
  const { title, project_id, id } = activeCanvas

  const onSectionSelect = section => setSelectedSection(sections.find(s => s.id === section.id))

  const onChangeCanvasMode = mode => {
    setSelectedSection(null)
    changeCanvasMode(mode)
  }

  const handleAutoAdjust = val => {
    setAutoAdjust(val)
  }

  return (
    <Wrapper>
      <CanvasHeader title={title} />

      <DropzoneArea
        projectId={project_id}
        canvasId={id}
        userId={user.id}
        hideButton={!!sections.length}
        onUpload={addSection}
      >
        <InnerArea
          position={
            autoAdjust // Check if the AutoAdjust is turned on
              ? getPosition(activePin?.position?.y, activePin?.position?.x, zoom)
              : 0 // else normal
          }
        >
          {editMode === EDIT_MODES.default &&
            sections.map((item, i) => (
              <>
                <ResizableImage
                  key={item.id + item.media.id}
                  item={item}
                  onSelect={onSectionSelect}
                  isActive={selectedSection && selectedSection.id === item.id}
                  zoomLevel={zoom}
                  onUpdate={updateSection}
                  projectId={project_id}
                  deleteSection={deleteSection}
                  deleteImage={deleteImage}
                  uploadMedia={uploadMediaToSection}
                />
                <Annotations zoom={zoom} editMode={editMode} onChangeCanvasMode={onChangeCanvasMode} />
              </>
            ))}
          {editMode === EDIT_MODES.annotation && <Annotations zoom={zoom} onChangeCanvasMode={onChangeCanvasMode} />}
          {editMode === EDIT_MODES.annotation &&
            sections.map((item, i) => <CanvasImage key={i} item={item} zoomLevel={zoom} />)}
        </InnerArea>
        <PreviewLink>
          Your canvas is published here:
          <Link href={'//paint.garden/#/' + id} target="_blank">
            paint.garden/{id}
          </Link>
        </PreviewLink>
      </DropzoneArea>

      {editMode === EDIT_MODES.annotation && (
        <Comments
          items={annotations.filter(a => !a.parent_id)}
          activePin={activePin}
          editMode={editMode}
          selectAnnotation={selectAnnotation}
          handleAnnotation={handleAutoAdjust}
        />
      )}

      <ActionsBar
        onUpload={addSection}
        editMode={editMode}
        onChangeCanvasMode={onChangeCanvasMode}
        onUploadViaUrl={() => setShowUploadUrlModal(true)}
        userId={user.id}
        projectId={project_id}
        canvasId={id}
      />

      <Zoom
        onClickPlus={() => zoom < MAX_ZOOM_LEVEL && setZoom(zoom + 1)}
        onClickMinus={() => zoom > -MAX_ZOOM_LEVEL && setZoom(zoom - 1)}
        zoomLevel={zoom}
      />

      {showUploadUrlModal && (
        <UploadViaUrl onClose={() => setShowUploadUrlModal(false)} onUpload={() => setShowUploadUrlModal(false)} />
      )}
    </Wrapper>
  )
}

Canvas.propTypes = {
  activeCanvas: PropTypes.object,
  updateSection: PropTypes.func,
  fetchCanvasData: PropTypes.func,
  fetchAnnotations: PropTypes.func,
  resetCanvasData: PropTypes.func,
  selectAnnotation: PropTypes.func,
  changeCanvasMode: PropTypes.func,
  editMode: PropTypes.string,
  annotations: PropTypes.array,
  user: PropTypes.object,
  match: PropTypes.object,
  activePin: PropTypes.object,
  uploadMediaToSection: PropTypes.func,
}

export default connect(
  ({ activeCanvas, editMode, annotations, projects, user, sections, activePin, zoom }) => ({
    activeCanvas,
    editMode,
    annotations,
    projects,
    user,
    sections,
    activePin,
    zoom,
  }),
  dispatch => bindActionCreators({ ...actions, fetchAnnotations, selectAnnotation }, dispatch),
)(Canvas)
