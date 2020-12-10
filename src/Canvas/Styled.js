import styled from 'styled-components'
import colors from '../constants/colors'

export const Wrapper = styled.div`
  background: ${colors.lightGreyBg};
  min-width: 100%;
  min-height: 100%;
  overflow-y: auto;
`

export const InnerArea = styled.div`
  min-width: 100%;
  min-height: 100%;
`

export const PreviewLink = styled.div`
  background: ${colors.black};
  border-radius: 4px;
  position: fixed;
  z-index: 20000;
  bottom: 30px;
  left: 20px;
  font-size: 10px;
  padding: 5px 60px 5px 24px;
  color: #ffffff;
`

export const Link = styled.a`
  display: inline-block;
  color: ${colors.blue};
  margin-left: 5px;
  font-weight: bold;
`
