import React from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'

const TextAreaStyled = styled.textarea`
  border: 1px solid ${colors.lightGrey2};
  box-sizing: border-box;
  border-radius: 4px;
  width: 100%;
  min-height: ${props => props.height || 150}px;
  padding: 14px;

  ${props => props.error && `border: 1px solid ${colors.red};`}
`

const TextArea = ({ children, ...props }) => <TextAreaStyled {...props}>{children}</TextAreaStyled>

export default TextArea
