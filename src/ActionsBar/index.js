import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, ActionButton, SubActionsBar, ZoomButton, ZoomButtons, ViewImage } from './Styled'
import grid from '../assets/grid.png'
import square from '../assets/non_grid.png'
import Constants from '../constants'
const { EDIT_MODES, MAX_ZOOM_LEVEL } = Constants

const ActionsBar = ({
  sectionName,
  zoomLevel,
  onZoomChange,
  isCanvasGridView,
  onChangeCanvasView,
  onChangeCanvasMode,
  editMode,
}) => (
  <Wrapper>
    <span>{editMode === EDIT_MODES.resize ? sectionName : ''}</span>
    <SubActionsBar>
      {/* <ActionButton onClick={() => onChangeCanvasMode(EDIT_MODES.dnd)} active={editMode === EDIT_MODES.dnd}>
        Move sections
      </ActionButton> */}
      <ActionButton onClick={() => onChangeCanvasMode(EDIT_MODES.resize)} active={editMode === EDIT_MODES.resize}>
        Move & resize
      </ActionButton>
      {/*<ActionButton onClick={() => onChangeCanvasMode(EDIT_MODES.webview)} active={editMode === EDIT_MODES.webview}>
        Define web view
      </ActionButton>*/}
      <ActionButton
        onClick={() => onChangeCanvasMode(EDIT_MODES.annotation)}
        active={editMode === EDIT_MODES.annotation}
      >
        Pins
      </ActionButton>
      <ZoomButtons>
        <ViewImage src={grid} active={isCanvasGridView} onClick={() => onChangeCanvasView(true)} />
        <ViewImage src={square} active={!isCanvasGridView} onClick={() => onChangeCanvasView(false)} />
      </ZoomButtons>
      <ZoomButtons>
        <ZoomButton onClick={() => zoomLevel > -MAX_ZOOM_LEVEL && onZoomChange(zoomLevel - 1)}>-</ZoomButton>
        <ZoomButton onClick={() => zoomLevel < MAX_ZOOM_LEVEL && onZoomChange(zoomLevel + 1)}>+</ZoomButton>
      </ZoomButtons>
      <span>Zoom level: {zoomLevel}</span>
    </SubActionsBar>
  </Wrapper>
)

ActionsBar.propTypes = {
  zoomLevel: PropTypes.number.isRequired,
  sectionName: PropTypes.string,
  onZoomChange: PropTypes.func,
  isCanvasGridView: PropTypes.bool,
  onChangeCanvasView: PropTypes.func,
  onChangeCanvasMode: PropTypes.func,
  editMode: PropTypes.string,
}

export default ActionsBar
