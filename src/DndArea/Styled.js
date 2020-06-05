import styled, { css } from 'styled-components'
import colors from '../constants/colors'

const Grid = css`
  background-size: 40px 40px;
  background-image: linear-gradient(to right, ${colors.lightGrey} 1px, transparent 1px),
    linear-gradient(to bottom, ${colors.lightGrey} 1px, transparent 1px);
`

export const Area = styled.div`
  width: 100%;
  min-height: 600px;
  height: 100%;
  background: #eee;
  position: relative;
  overflow: auto;

`
//  ${props => props.isGrid && Grid} add griid if need to
export const InnerArea = styled.div`
  min-width: 100%;
  min-height: 100%;
`


export const UploadWrapper = styled.div`
  width: 100%;
  `


  export const PreviewLink = styled.div`
  background: rgba(0,0,0,0.59);
  border-radius: 4px;
  position: fixed;
  z-index: 20000;
  bottom: 0vh;
  right: 5vw;
  font-size: 13px;
  font-family: Spartan Light;
  padding 15px;
  color: #FFFFFF;
`

export const Link = styled.a`
  display: inline-block;
  color:#4DA1FF;
  margin-left: 10px;
`
