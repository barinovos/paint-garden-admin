import React from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'

const TextAreaStyled = styled.textarea`
  border: 1px solid ${props => (props.secondary ? colors.lightGrey2 : colors.blue)};
  box-sizing: border-box;
  border-radius: 4px;
  width: 100%;
  height: ${props => props.height || 45}px;
  padding: 9px;
  color: #000;

  ${props => props.error && `border: 1px solid ${colors.red};`}
`
const handleKeyDown = e => {
  e.target.style.height = 'inherit'
  //e.target.style.height = `${e.target.scrollHeight}px`
  // In case you have a limitation
  e.target.style.height = `${Math.min(e.target.scrollHeight, 105)}px`
}

const TextArea = ({ children, ...props }) => (
  <TextAreaStyled {...props} onKeyDown={handleKeyDown}>
    {children}
  </TextAreaStyled>
)

export default TextArea
