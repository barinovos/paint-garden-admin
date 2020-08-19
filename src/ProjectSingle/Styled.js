import styled from 'styled-components'
import colors from '../constants/colors'

export const Wrapper = styled.div`
  margin-right: 36px;
  margin-bottom: 36px;
  text-align: center;
  width: 220px;
  height: 220px;
  display: inline-flex;
  flex-direction: column;
  position: relative;
`

export const Title = styled.div`
  font-family: Spartan SemiBold, sans-serif;
  font-style: normal;
  font-weight: normal;
  display: block;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const UserName = styled.div`
  font-size: 10px;
  line-height: 14px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const ImageWrapper = styled.div`
  display: block;
  position: relative;
  height: 100%;
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.5s ease;
  background-color: rgba(${colors.rgbaGray});
  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`

export const Icons = styled.div`
  position: absolute;
  display: none;
  top: 0;
  right: 15px;
  padding-top: 4px;
  padding-left: 7px;
  transform: translateY(-26px);
  transition: transform ease-in 0.3s;

  ${ImageWrapper}:hover & {
    display: block;
    transform: translateY(0px);
  }
`

export const InfoOverlay = styled.div`
  text-align: left;
  position: absolute;
  bottom: 0;
  padding: 10px 12px;
  width: 100%;
  background-color: rgba(77, 161, 255, 0.6);
`
