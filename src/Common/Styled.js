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
`

export const IconWrapper = styled.div`
  cursor: pointer;
`
