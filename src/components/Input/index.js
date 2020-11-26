import React from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'

const InputStyled = styled.input`
  border: 1px solid ${props => (props.secondary ? colors.lightGrey2 : colors.blue)};
  box-sizing: border-box;
  border-radius: 4px;
  width: ${props => props.width || '100%'};
  padding: 9px;
  height: ${props => props.height || '35px'};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #000;

  ${props => props.error && `border: 1px solid ${colors.red};`};
`

const Input = props => <InputStyled {...props} />

export default Input
