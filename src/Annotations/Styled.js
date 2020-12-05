import styled from 'styled-components'
import colors from '../constants/colors'

export const PinWrapper = styled.div`
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  cursor: pointer;
  z-index: 100;
`

export const PinViewWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
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
  padding: 0 15px;
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
  left: -52px;
  top: 60px;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  background: ${colors.lightGrey};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const MediaThumb = styled.img`
  max-height: 60px;
  margin: 6px 10px 6px 0;
`

export const Date = styled.div`
  font-size: 10px;
  color: ${colors.darkGrey};
`

export const IconWrapper = styled.div`
  margin-left: 7px;
  cursor: pointer;
`

export const ReplyText = styled.div`
  margin: 7px 0 14px;
`

export const ReplyWrapper = styled.div`
  border-bottom: 1px solid ${colors.lightGrey2};
  padding-top: 11px;
`
