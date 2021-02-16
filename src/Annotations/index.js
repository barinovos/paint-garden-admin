import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AnnotationIcon from './AnnotationIcon'
import Annotation from './Annotation'
import { PinViewWrapper } from './Styled'
import { reCalcSizeWithZoom } from '../utils/calcZoom'
import * as actions from './actions'
import Constants from '../constants'
const { EDIT_MODES } = Constants

const getTopLevelPins = annotations => annotations.filter(a => !a.parent_id)

const Annotations = ({
  annotations,
  addAnnotation,
  editAnnotation,
  deleteAnnotation,
  zoom,
  user,
  activePin,
  selectAnnotation,
  activeCanvas,
  sections,
  editMode,
  onChangeCanvasMode,
}) => {
  const [position, setPosition] = useState(null)

  const onAddPin = ev => {
    const x = reCalcSizeWithZoom(ev.clientX, zoom)
    const y = reCalcSizeWithZoom(ev.clientY, zoom)
    setPosition({
      x,
      y,
    })
    selectAnnotation({})
  }

  const onShowModalForEdit = pin => {
    setPosition({
      x: +pin.position.x,
      y: +pin.position.y,
    })
    selectAnnotation(pin)
  }

  const onComment = (data, mediaFiles) => {
    addAnnotation(
      {
        ...data,
        project_id: activeCanvas.project_id,
        canvas_id: activeCanvas.id,
        user_id: user.id,
        // TODO: we don't need it here
        section_id: sections[0] ? sections[0].id : '',
      },
      mediaFiles,
    )
  }

  return editMode === EDIT_MODES.default ? (
    getTopLevelPins(annotations).map((pin, i) => (
      <AnnotationIcon
        key={i}
        data={pin}
        onPinClick={onShowModalForEdit}
        onChangeCanvasMode={onChangeCanvasMode}
        zoomLevel={zoom}
      />
    ))
  ) : (
    <PinViewWrapper onClick={onAddPin}>
      {getTopLevelPins(annotations).map((pin, i) => (
        <AnnotationIcon
          key={i}
          data={pin}
          onPinClick={onShowModalForEdit}
          onChangeCanvasMode={onChangeCanvasMode}
          zoomLevel={zoom}
        />
      ))}
      {activePin && (
        <Annotation
          data={activePin}
          user={user}
          position={(activePin && activePin.position) || position}
          onComment={onComment}
          onDelete={deleteAnnotation}
          onClose={() => selectAnnotation(null)}
          onEdit={editAnnotation}
          zoomLevel={zoom}
        />
      )}
    </PinViewWrapper>
  )
}

Annotations.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.object),
  addAnnotation: PropTypes.func,
  deleteAnnotation: PropTypes.func,
  editAnnotation: PropTypes.func,
  zoom: PropTypes.number,
  user: PropTypes.object,
  selectAnnotation: PropTypes.func,
  activePin: PropTypes.object,
  sections: PropTypes.array,
  activeCanvas: PropTypes.object,
  editMode: PropTypes.string,
  onChangeCanvasMode: PropTypes.func,
}

export default connect(
  ({ activeCanvas, annotations, user, activePin, sections }) => ({
    activeCanvas,
    annotations,
    user,
    activePin,
    sections,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)(Annotations)
