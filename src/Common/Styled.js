import styled, { css } from 'styled-components'
import colors from '../constants/colors'

const ButtonMainStyle = css`
  background: ${colors.buttonBg};
  color: ${colors.mainGrey};
  min-width: 120px;
  text-align: center;
  cursor: pointer;

  &:hover {
    box-shadow: 1px 1px 4px 0 ${colors.blue};
  }
`

const ButtonAlarmStyle = css`
  background: ${colors.pink};
  color: ${colors.red};
  min-width: 120px;
  text-align: center;

  &:hover {
    box-shadow: 2px 2px 2px 2px ${colors.red};
  }
`

const ButtonSecondaryStyle = css`
  background: transparent;
  color: ${colors.dark};

  &:hover {
    background: ${colors.lightGrey};
  }
`

const BasicText = css`
  font-size: 18px;
  line-height: 22px;
  font-weight: 500;
  color: ${colors.darkGrey};
`

export const LinkText = styled.div`
  ${BasicText};
  cursor: pointer;
  padding: 10px 20px;
  text-decoration: none;
  ${props => props.active && `color: ${colors.mainGrey}`};
  ${props => props.bold && 'font-weight: 600'} &:hover {
    color: darkgrey;
  }
`

export const Button = styled.div`
  border-radius: 3px;
  position: relative;
  display: inline-block;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  text-decoration: none;
  ${props => (props.secondary ? ButtonSecondaryStyle : props.alarm ? ButtonAlarmStyle : ButtonMainStyle)};
`

export const MainArea = styled.div`
  overflow-y: auto;
  height: 100%;
`

const ActiveImage = css`
  border: 2px dashed ${colors.darkGrey};
`

export const Image = styled.img`
  width: ${props => props.width || 200}px;
  height: ${props => props.height || 100}px;
  top: ${props => props.top || 0}px;
  left: ${props => props.left || 0}px;
  user-select: none;
  ${props => props.selected && ActiveImage};
`

const CommonInput = css`
  border-radius: 3px;
  background: ${colors.inputBg};
  color: ${colors.dark};
  border: none;
  outline: none;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  margin-bottom: 16px;

  &:active,
  &:focus {
    outline: none;
  }
`

export const ItemInput = styled.input`
  ${CommonInput};
  height: 32px;
  line-height: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 16px;
  width: ${props => props.width || 100}%;

  ${props =>
    props.error &&
    `
    border: 1px solid ${colors.red};
  `}
`

export const ItemTextArea = styled.textarea`
  ${CommonInput};
  height: 117px;
  line-height: 20px;
  width: 100%;
  padding: 10px 16px;

  ${props =>
    props.error &&
    `
    border: 1px solid ${colors.red};
  `}
`

export const JustifiedRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  ${props => props.direction === 'column' && 'flex-direction: column'}
`

export const RightAlignedRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
`

export const Icon = styled.img.attrs({ alt: '' })`
  cursor: pointer;
  vertical-align: middle;

  ${props => !props.fullSize && 'margin-right: 7px;'}
  ${props => props.fullSize && `min-height: 100%; min-width: 100%;`}
`

export const Title = styled.div`
  font-weight: 300;
  font-size: 20px;
  margin-bottom: 20px;
`

export const AddImage = styled.div`
  height: 85px;
  background: lightgray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 1.2em;
`

export const ErrorMessage = styled.p`
  margin-top: 1em;
  color: ${colors.red};
  text-align: center;
`

export const FullSizeImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`

export const SubTitle = styled.p`
  font-family: Spartan, sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 17px;
  line-height: 19px;
  color: #202020;
  margin-bottom: 1em;
`

export const FlexLayout = styled.div`
  display: flex;
  align-items: center;
  
  ${props => (props.justifyContent ? `justify-content: ${props.justifyContent};` : '')}
  ${props => (props.flexDirection ? `flex-direction: ${props.flexDirection};` : '')}
  ${props => (props.padding ? `padding: ${props.padding};` : '')}
  ${props => (props.margin ? `margin: ${props.margin};` : '')}
`
