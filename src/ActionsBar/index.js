import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, ActionButton, SubActionsBar, ZoomButton, ZoomButtons, ViewImage } from './Styled'
import grid from '../assets/grid.png'
import square from '../assets/non_grid.png'
import hand from '../assets/hand.svg'
import pin from '../assets/Pin.svg'
import upload from '../assets/upload.svg'
import area from '../assets/area.svg'
import handActive from '../assets/hand_active.svg'
import pinActive from '../assets/Pin_active.svg'
import uploadActive from '../assets/upload_active.svg'
import areaActive from '../assets/area_active.svg'
import Constants from '../constants'
import { Icon } from '../Common/Styled'
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
    {/* <span>{editMode === EDIT_MODES.resize ? sectionName : ''}</span> */}
    <SubActionsBar>
      {/* <ActionButton onClick={() => onChangeCanvasMode(EDIT_MODES.dnd)} active={editMode === EDIT_MODES.dnd}>
        Move sections
      </ActionButton> */}
      {/*<ActionButton onClick={() => onChangeCanvasMode(EDIT_MODES.webview)} active={editMode === EDIT_MODES.webview}>
        Define web view
      </ActionButton>*/}
      <ActionButton
        onClick={() => onChangeCanvasMode(EDIT_MODES.area)}
        active={editMode === EDIT_MODES.area}
      >
        { editMode !== EDIT_MODES.area && <Icon style={{margin:"20px 0 10px"}}  src={area} />}
        { editMode === EDIT_MODES.area && <Icon style={{margin:"20px 0 10px"}}  src={areaActive} />}
      </ActionButton>
      <ActionButton
        onClick={() => onChangeCanvasMode(EDIT_MODES.annotation)}
        active={editMode === EDIT_MODES.annotation}
      >
      { editMode !== EDIT_MODES.annotation && <Icon style={{margin:"10px 0"}}  src={pin} />}
      { editMode === EDIT_MODES.annotation && <Icon style={{margin:"10px 0"}}  src={pinActive} />}
      </ActionButton>

      <ActionButton
        onClick={() => onChangeCanvasMode(EDIT_MODES.upload)}
        active={editMode === EDIT_MODES.upload}
      >
      { editMode !== EDIT_MODES.upload && <Icon style={{margin:"10px 0"}}  src={upload} />}
      { editMode === EDIT_MODES.upload && <Icon style={{margin:"10px 0"}}  src={uploadActive} />}
      </ActionButton>
      <ActionButton onClick={() => onChangeCanvasMode(EDIT_MODES.resize)} active={editMode === EDIT_MODES.resize}>
        { editMode !== EDIT_MODES.resize && <Icon style={{margin:"20px 0 10px"}}  src={hand} />}
        { editMode === EDIT_MODES.resize && <Icon style={{margin:"20px 0 10px"}}  src={handActive} />}
      </ActionButton>
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
