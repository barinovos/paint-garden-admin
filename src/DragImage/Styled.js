import styled, { css } from 'styled-components'
import colors from '../constants/colors'

const ActiveImage = css`
  border: 2px dashed ${colors.darkGrey};
`

export const Image = styled.img`
  position: absolute;
  width: ${props => props.width || 200}px;
  height: ${props => props.height || 100}px;
  top: ${props => props.top || 0}px;
  left: ${props => props.left || 0}px;
  ${props => props.isSelected && ActiveImage};
`
