import styled, { css } from 'styled-components'
import colors from '../constants/colors'

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

export const ErrorMessage = styled.p`
  margin-top: 1em;
  color: ${colors.red};
  text-align: center;
`

export const SubTitle = styled.p`
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
