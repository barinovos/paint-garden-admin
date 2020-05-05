import styled from 'styled-components'
import colors from '../constants/colors'
export const Wrapper = styled.div`
    margin: 20px 30px;
    display: inline-block;
    text-align: center;
`

export const Title = styled.span `
    font-family: ProximaNova;
    display: block;
    color: #4DA1FF;
    font-size: 0.8em;
`

export const DateWrapper = styled.span `
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    color: #939EAB;
    font-size: 0.8em;
`
export const ImageWrapper = styled.div `
    display: block;
    position: relative;
`

export const Overlay = styled.div `
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: .5s ease;
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
  transition: transform ease-in .3s;

  ${ImageWrapper}:hover & {
    display: block;
    transform: translateY(0px);
  }
`
