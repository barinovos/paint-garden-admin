import styled from 'styled-components'
import colors from '../constants/colors'

export const Wrapper = styled.div`
  margin: 20px 30px;
  text-align: center;
  width: 220px;
  height: 220px;
  display: inline-flex;
  flex-direction: column;
  position: relative;
`

export const Title = styled.span`
  font-family: Spartan SemiBold, sans-serif;
  font-style: normal;
  font-weight: normal;
  display: block;
  font-size: 12px;
  color: #000000;
`

export const ImageWrapper = styled.div`
  display: block;
  position: relative;
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
  bottom: 5px;
  padding: 12px;
  width: 100%;
  background-color: #fff;
  opacity: 0.7;
`
