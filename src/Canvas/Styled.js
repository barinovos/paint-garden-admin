import styled from 'styled-components'
import colors from '../constants/colors'

export const Wrapper = styled.div`
  padding: 25px;
  background: whitesmoke;
  width: 100%;
  height: 100%;
`

export const ActionsBar = styled.div`
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
  margin-right: 30px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: ${colors.blue};
  }
`

export const ZoomButtons = styled.div`
  display: flex;
  border: 1px solid ${colors.lightGrey};
  border-radius: 2px;
  height: 28px;
  width: 54px;
  background: white;
  margin-right: 10px;
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
