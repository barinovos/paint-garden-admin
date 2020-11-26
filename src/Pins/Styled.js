import styled from 'styled-components'
import colors from '../constants/colors'

export const PinWrapper = styled.div`
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  cursor: pointer;
`

export const PinViewWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
`

export const AddImage = styled.div`
  height: 26px;
  width: 26px;
  position: relative;
  cursor: pointer;
`

export const HiddenInput = styled.input.attrs({
  type: 'file',
  multiple: false,
  accept: 'image/*',
})`
  position: absolute;
  left: 0;
  top: 0;
  height: 26px;
  opacity: 0;
  width: 100%;
  cursor: pointer;
`

// New Comment UI
export const CommentModal = styled.div`
  position: absolute;
  left: ${props => props.left || '50%'};
  top: ${props => props.top || '50%'};
  background: white;
  min-height: 135px;
  min-width: 360px;
  padding: 12px;
  z-index: 1001;
`

export const Avatar = styled.div`
  border-radius: 50%;
  background: ${colors.blue};
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  text-transform: uppercase;
  margin-right: 12px;
`

export const ActivePin = styled.div`
  position: absolute;
  left: -50px;
  top: 60px;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  background: ${colors.lightGrey};
  display: flex;
  align-items: center;
  justify-content: center;
`
