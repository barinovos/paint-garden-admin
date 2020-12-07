import React from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'

const TextAreaStyled = styled.textarea`
  border: 1px solid ${props => (props.secondary ? colors.lightGrey2 : colors.blue)};
  box-sizing: border-box;
  border-radius: 4px;
  width: 100%;
  min-height: ${props => props.height || 35}px;
  padding: 9px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #000;

  ${props => props.error && `border: 1px solid ${colors.red};`}
`

const TextArea = ({ children, ...props }) => <TextAreaStyled {...props}>{children}</TextAreaStyled>

export default TextArea
