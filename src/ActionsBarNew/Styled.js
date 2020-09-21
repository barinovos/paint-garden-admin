import styled from 'styled-components'
import colors from '../constants/colors'

export const Wrapper = styled.div`
  display: block;
  background-color: #fff;
  border-radius: 4px;
  padding: 12px;
  position: fixed;
  text-align: center;
  top: 20vh;
  left: 2vw;
  z-index: 20000;
`

export const ActionButton = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8px;
  border-radius: 3px;

  transition: background-color 0.1s ease;

  & svg {
    fill: #d8d8d8;
    stroke: #d8d8d8;
    height: 19px;
    width: 19px;
  }

  &:hover {
    background-color: ${colors.hoverBlue};

    & svg {
      fill: white;
      stroke: white;
    }
  }
`

export const ZoomButtons = styled.div`
  display: flex;
  border: 1px solid ${colors.lightGrey};
  border-radius: 2px;
  height: 28px;
  width: 56px;
  background: white;
  margin-right: 10px;
  margin-left: 10px;
`

export const ViewImage = styled.img`
  padding: 5px;
  width: 27px;
  cursor: pointer;
  ${props => props.active && `background: ${colors.lightGrey}`}
`

export const ZoomButton = styled.div`
  margin: 5px 0;
  flex: 1;
  color: ${colors.darkGrey};
  font-size: 18px;
  line-height: 1em;
  cursor: pointer;
  text-align: center;
  user-select: none;
  border-right: 1px solid ${colors.lightGrey};

  &:last-child {
    border-right: none;
  }
`
