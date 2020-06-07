import styled from 'styled-components'
import colors from '../constants/colors'

export const Wrapper = styled.div`
  background: whitesmoke;
  width: 100%;
  height: 100%;
`


export const ZoomButtons = styled.div`
  display: flex
  border-radius: 4px;
  background: white;
  margin-right: 10px;
  margin-left: 10px;
  position: fixed;
  bottom: 10vh;
  right: 5vw;
  z-index: 2;
  padding: 15px 0;
  width: 200px;
`

export const ZoomButton = styled.div`
  flex: 1;
  color: ${colors.black};
  font-size: 1.2em;
  line-height: 1em;
  padding: 0 0.4em;
  cursor: pointer;
  margin: 0.3em 0;
  text-align: center;
  user-select: none;
  &:first-child {
    border-right: 1px solid ${colors.lightGrey}
  }
`
