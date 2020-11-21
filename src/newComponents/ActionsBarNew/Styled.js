import styled from 'styled-components'
import colors from '../../constants/colors'

export const Wrapper = styled.div`
  display: block;
  background-color: #fff;
  border-radius: 4px;
  position: fixed;
  text-align: center;
  top: 20vh;
  left: 20px;
  z-index: 20000;
`
export const ActionButtonWrapper = styled.a`
  padding: 10px;
  display: block;

  padding-bottom: 2px;
  padding-top: 2px;
`

export const ActionButton = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8px;
  border-radius: 3px;

  transition: background-color 0.1s ease;

  & svg,
  & path {
    fill: ${props => (props.active ? colors.black : colors.lightGrey)};
    stroke: ${props => (props.active ? colors.black : colors.lightGrey)};
    height: 19px;
    width: 19px;
  }

  &:hover {
    background-color: ${colors.blue};

    & svg,
    & path {
      fill: white;
      stroke: white;
    }
  }
`

export const Separator = styled.div`
  height: 1px;
  border-top: 1px solid ${colors.lightGrey};
  margin: 10px 5px;
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
