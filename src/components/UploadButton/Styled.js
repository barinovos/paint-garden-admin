import styled from 'styled-components'
import colors from '../../constants/colors'

export const Button = styled.div`
  display: inline-block;
  width: 35px;
  height: 35px;
  ${props => !props.grey && `background-color: ${colors.blue}`};
  border-radius: 3px;
  padding: 6px 7px;
  transition: background-color 0.1s ease;

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
