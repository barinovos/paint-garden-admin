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
  height: calc(100% - 38px);
  background: white;
  position: relative;
  overflow: auto;
  ${props => props.isGrid && Grid}
`

export const InnerArea = styled.div`
  min-width: 100%;
  min-height: 100%;
`
