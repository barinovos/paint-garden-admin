import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../constants/colors'
import { ReactComponent as UploadIcon } from '../../assets/upload__new.svg'
import { ReactComponent as PlusIcon } from '../../assets/add.svg'

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  ${props => !props.grey && `background-color: ${colors.blue}`};
  border-radius: 3px;
  padding: 6px 7px;
  transition: background-color 0.1s ease;
  position: relative;

  & svg,
  & path {
    fill: ${props => (props.grey ? colors.lightGrey : '#fff')};
  }

  ${props =>
    props.grey &&
    `
    &:hover {
      background-color: ${colors.blue};

      & svg, & path {
        fill: white;
        stroke: white;
      }
    }
  `}
`

const HiddenInput = styled.input.attrs({
  type: 'file',
  multiple: true,
  accept: 'image/*,video/*',
})`
  position: absolute;
  left: 0;
  top: 0;
  height: 35px;
  width: 35px;
  opacity: 0;
  cursor: pointer;
`

const UploadButton = ({ onUpload, grey = false, isPlus = false, onChangeCanvasMode }) => (
  <StyledButton grey={grey}>
    {isPlus ? <PlusIcon /> : <UploadIcon />}
    <HiddenInput
      onChange={ev => {
        onChangeCanvasMode()
        onUpload(ev.target.files)
      }}
    />
  </StyledButton>
)

UploadButton.propTypes = {
  onUpload: PropTypes.func.isRequired,
  onChangeCanvasMode: PropTypes.func.isRequired,
  grey: PropTypes.bool,
  isPlus: PropTypes.bool,
}

export default UploadButton
