import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as LinkIcon } from '../../assets/link__new.svg'
import { ReactComponent as UploadIcon } from '../../assets/upload__new.svg'
import { ReactComponent as PinIcon } from '../../assets/pin__new.svg'

import Tooltip from '../Tooltip'

import * as Styled from './Styled'

const ActionsBar = ({ onChangeCanvasMode, editMode }) => (
  <Styled.Wrapper>
    <>
      <Styled.ActionButtonWrapper data-tip data-for="upload" style={{ paddingTop: '10px' }}>
        <Styled.ActionButton
          onClick={() => {
            console.log('upload image')
          }}
        >
          <UploadIcon />
        </Styled.ActionButton>
      </Styled.ActionButtonWrapper>
      <Tooltip text="Upload" id="upload" place="right" />
    </>
    <>
      <Styled.ActionButtonWrapper data-tip data-for="uploadUrl">
        <Styled.ActionButton
          onClick={() => {
            console.log('upload via link')
          }}
        >
          <LinkIcon />
        </Styled.ActionButton>
      </Styled.ActionButtonWrapper>
      <Tooltip text="Upload via URL" id="uploadUrl" place="right" />
    </>
    <>
      <Styled.ActionButtonWrapper data-tip data-for="comment" style={{ paddingBottom: '10px' }}>
        <Styled.ActionButton
          onClick={() => {
            console.log('add comment')
          }}
        >
          <PinIcon />
        </Styled.ActionButton>
      </Styled.ActionButtonWrapper>
      <Tooltip text="Comment" id="comment" place="right" />
    </>
  </Styled.Wrapper>
)

ActionsBar.propTypes = {
  onChangeCanvasMode: PropTypes.func,
  editMode: PropTypes.string,
}

export default ActionsBar
