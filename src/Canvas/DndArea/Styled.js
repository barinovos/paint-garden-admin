import styled from 'styled-components'
import colors from '../../constants/colors'

export const Area = styled.div`
  width: 100%;
  min-height: 600px;
  height: 100%;
  background: #eee;
  position: relative;
  overflow: auto;
`

export const InnerArea = styled.div`
  min-width: 100%;
  min-height: 100%;
`

export const PreviewLink = styled.div`
  /* background: rgba(0, 0, 0, 0.59);
 */
  background: ${colors.black};
  border-radius: 4px;
  position: fixed;
  z-index: 20000;
  bottom: 30px;
  left: 20px;
  font-size: 10px;
  font-family: Spartan Light, sans-serif;
  padding: 5px;
  padding-left: 24px;
  padding-right: 60px;
  color: #ffffff;
`

export const Link = styled.a`
  display: inline-block;
  color: #4da1ff;
  margin-left: 5px;
  font-weight: bold;
`
