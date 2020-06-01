import styled, { css } from 'styled-components'
import colors from '../constants/colors'

const ButtonMainStyle = css`
  background: ${colors.buttonBg};
  color: ${colors.mainGrey};
  min-width: 120px;
  text-align: center;
`

const ButtonAlarmStyle = css`
  background: ${colors.pink};
  color: ${colors.red};
  min-width: 120px;
  text-align: center;
`

const ButtonSecondaryStyle = css`
  background: transparent;
  color: ${colors.dark};
`

const BasicText = css`
  font-size: 18px;
  line-height: 22px;
  font-weight: 500;
  color: ${colors.grey};
`

export const Text = styled.div`
  ${BasicText};
`

export const TextBlue = styled.div`
  ${BasicText};
  cursor: pointer;
  color: ${colors.mainGrey};

  &:hover {
    text-decoration: underline;
  }
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
export const LoginButton = styled.div`
  background: #4DA1FF;
  border-radius: 6px;
  width: 90%;
  text-align: center;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  min-height: 32px;
  /* identical to box height, or 133% */
  padding: 0 16px;
  color: #FFFFFF;
  @media (min-width: 768px) {
    width: 350px;
  }
`

export const Button = styled.div`
  border-radius: 3px;
  position: relative;
  display: inline-block;
  cursor: pointer;
  padding: 10px 20px;
  text-decoration: none;
  ${props => (props.secondary ? ButtonSecondaryStyle : props.alarm ? ButtonAlarmStyle : ButtonMainStyle)};
`

export const MainArea = styled.div`
  height: calc(100% - 60px);
  overflow-y: auto;
  height: 100%;
`

export const IconWrapper = styled.div`
  cursor: pointer;
`

const ActiveImage = css`
  border: 2px dashed ${colors.darkGrey};
`

export const Image = styled.img`
  position: absolute;
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
`

export const ItemTextArea = styled.textarea`
  ${CommonInput};
  height: 117px;
  line-height: 20px;
  width: 100%;
  padding: 10px 16px;
`

export const JustifiedRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

export const RightAlignedRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
`

export const Icon = styled.img.attrs({ alt: '' })`
  cursor: pointer;
  margin-right: 7px;
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
