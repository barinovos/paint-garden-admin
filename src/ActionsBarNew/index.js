import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as LinkIcon } from '../assets/link__new.svg'
import { ReactComponent as UploadIcon } from '../assets/upload__new.svg'
import { ReactComponent as PinIcon } from '../assets/pin__new.svg'

import * as Styled from './Styled'

const ActionsBar = ({ onChangeCanvasMode, editMode }) => (
  <Styled.Wrapper>
    <Styled.ActionButton
      onClick={() => {
        console.log('upload image')
      }}
    >
      <UploadIcon />
    </Styled.ActionButton>
    <Styled.ActionButton
      onClick={() => {
        console.log('upload via link')
      }}
    >
      <LinkIcon />
    </Styled.ActionButton>
    <Styled.ActionButton
      onClick={() => {
        console.log('add comment')
      }}
    >
      <PinIcon />
    </Styled.ActionButton>
  </Styled.Wrapper>
)

ActionsBar.propTypes = {
  onChangeCanvasMode: PropTypes.func,
  editMode: PropTypes.string,
}

export default ActionsBar
