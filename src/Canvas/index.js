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

const { MAX_ZOOM_LEVEL, EDIT_MODES } = Constants

const Canvas = ({
  activeCanvas,
  updateSection,
  editMode,
  annotations,
  user,
  sections,
  editPin,
  addPin,
  deletePin,
  addSection,
  uploadMedia,
  deleteSection,
  deleteImage,
  changeCanvasMode,
  match,
  fetchCanvasData,
  fetchAnnotations,
  resetCanvasData,
  selectAnnotation,
  activePin,
}) => {
  const [selectedSection, setSelectedSection] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(0)
  const [showUploadUrlModal, setShowUploadUrlModal] = useState(false)

  useEffect(() => {
    fetchCanvasData(match.params.canvasId)
    fetchAnnotations(match.params.canvasId)
    return resetCanvasData
  }, [match, fetchCanvasData, resetCanvasData, fetchAnnotations])

  if (!activeCanvas) {
    return <PageLoader />
  }
  const { title, project_id, id } = activeCanvas
  const selectedItemId = selectedSection ? selectedSection.id : null

  const onSectionSelect = section => setSelectedSection(sections.find(s => s.id === section.id))

  const onChangeCanvasMode = mode => {
    setSelectedSection(null)
    changeCanvasMode(mode)
  }

  return (
    <Wrapper>
      <CanvasHeader title={title} />

      <DropzoneArea projectId={project_id} canvasId={id} userId={user.id} hideButton={!!sections.length}>
        <InnerArea>
          {editMode === EDIT_MODES.default &&
            sections.map((item, i) => (
              <ResizableImage
                key={i}
                item={item}
                onSelect={onSectionSelect}
                selectedItemId={selectedItemId}
                zoomLevel={zoomLevel}
                onUpdate={updateSection}
                projectId={project_id}
                onChangeActiveImageIndex={() => null}
                deleteSection={deleteSection}
                deleteImage={deleteImage}
                uploadMedia={uploadMedia}
              />
            ))}
          {editMode === EDIT_MODES.annotation && <Annotations zoomLevel={zoomLevel} />}
          {editMode === EDIT_MODES.annotation &&
            sections.map((item, i) => (
              <CanvasImage
                key={i}
                item={item}
                onSelect={onSectionSelect}
                selectedItemId={selectedItemId}
                zoomLevel={zoomLevel}
              />
            ))}
        </InnerArea>
        <PreviewLink>
          Your canvas is published here:
          <Link href={'//paint.garden/#/' + id} target="_blank">
            paint.garden/{id}
          </Link>
        </PreviewLink>
      </DropzoneArea>

      {editMode === EDIT_MODES.annotation && (
        <Comments items={annotations} activePin={activePin} selectAnnotation={selectAnnotation} />
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
        onClickPlus={() => zoomLevel < MAX_ZOOM_LEVEL && setZoomLevel(zoomLevel + 1)}
        onClickMinus={() => zoomLevel > -MAX_ZOOM_LEVEL && setZoomLevel(zoomLevel - 1)}
        zoomLevel={zoomLevel}
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
}

export default connect(
  ({ activeCanvas, editMode, annotations, projects, user, sections, activePin }) => ({
    activeCanvas,
    editMode,
    annotations,
    projects,
    user,
    sections,
    activePin,
  }),
  dispatch => bindActionCreators({ ...actions, fetchAnnotations, selectAnnotation }, dispatch),
)(Canvas)
