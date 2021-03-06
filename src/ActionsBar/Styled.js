import styled from 'styled-components'
import colors from '../constants/colors'

export const Wrapper = styled.div`
  display: flex;
  padding: 0 15px 10px;
  justify-content: space-between;
  align-items: center;
`

export const SubActionsBar = styled.div`
  display: flex;
  align-items: center;
`

export const ActionButton = styled.div`
  padding: 0 15px;
  cursor: pointer;
  border-left: 1px solid ${colors.darkBlue};
  ${props => props.active && `background: ${colors.lightGrey}`}

  &:hover {
    color: white;
    background: ${colors.darkGrey};
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
  
  &:first-child {
    border-right: 1px solid ${colors.lightGrey}
  }
`
