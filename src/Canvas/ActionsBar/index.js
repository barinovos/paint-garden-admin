import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from '../../components/Tooltip'
import { ReactComponent as LinkIcon } from '../../assets/link__new.svg'
import { ReactComponent as PinIcon } from '../../assets/pin__new.svg'
import { ReactComponent as HandIcon } from '../../assets/hand.svg'
import { Wrapper, ActionButtonWrapper, ActionButton, Separator } from './Styled'
import UploadButton from '../../components/UploadButton'
import Constants from '../../constants'
const { EDIT_MODES } = Constants

const ActionsBar = ({ onUpload, onChangeCanvasMode, editMode, userId, projectId, canvasId }) => (
  <Wrapper>
    <>
      <ActionButtonWrapper data-tip data-for="upload" style={{ paddingTop: '10px' }}>
        <UploadButton onUpload={files => onUpload(files[0], userId, projectId, canvasId)} grey />
      </ActionButtonWrapper>
      <Tooltip text="Upload" id="upload" place="right" />
    </>
    <>
      <ActionButtonWrapper data-tip data-for="uploadUrl">
        <ActionButton
          onClick={() => {
            console.log('upload via link')
          }}
        >
          <LinkIcon />
        </ActionButton>
      </ActionButtonWrapper>
      <Tooltip text="Upload via URL" id="uploadUrl" place="right" />
    </>
    <Separator />
    <>
      <ActionButtonWrapper data-tip data-for="comment" style={{ paddingBottom: '10px' }}>
        <ActionButton
          onClick={() => onChangeCanvasMode(EDIT_MODES.annotation)}
          active={editMode === EDIT_MODES.annotation}
        >
          <PinIcon />
        </ActionButton>
      </ActionButtonWrapper>
      <Tooltip text="Comment" id="comment" place="right" />
    </>
    <>
      <ActionButtonWrapper data-tip data-for="default" style={{ paddingBottom: '10px' }}>
        <ActionButton onClick={() => onChangeCanvasMode(EDIT_MODES.default)} active={editMode === EDIT_MODES.default}>
          <HandIcon />
        </ActionButton>
      </ActionButtonWrapper>
      <Tooltip text="Move & Resize" id="default" place="right" />
    </>
  </Wrapper>
)

ActionsBar.propTypes = {
  onChangeCanvasMode: PropTypes.func,
  editMode: PropTypes.string,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  canvasId: PropTypes.string,
  projectId: PropTypes.string,
  onUpload: PropTypes.func,
}

export default ActionsBar
