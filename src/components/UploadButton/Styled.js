import styled from 'styled-components'
import colors from '../../constants/colors'

export const Button = styled.div`
  display: inline-block;
  width: 35px;
  height: 35px;
  background-color: ${colors.blue};
  border-radius: 3px;
  color: #fff;
  padding: 6px 7px;

  & svg {
    fill: #fff;
  }
`

export const HiddenInput = styled.input.attrs({
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
