import styled from 'styled-components'
import colors from '../../constants/colors'

export const Wrapper = styled.div`
  display: block;
  background-color: #fff;
  border-radius: 4px;
  position: fixed;
  text-align: center;
  top: 20vh;
  left: 20px;
  z-index: 20000;
`
export const ActionButtonWrapper = styled.a`
  padding: 10px;
  display: block;

  padding-bottom: 2px;
  padding-top: 2px;
`

export const ActionButton = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8px;
  border-radius: 3px;

  transition: background-color 0.1s ease;

  & svg,
  & path {
    fill: ${props => (props.active ? colors.black : colors.lightGrey)};
    stroke: ${props => (props.active ? colors.black : colors.lightGrey)};
    height: 19px;
    width: 19px;
  }

  &:hover {
    background-color: ${colors.blue};

    & svg,
    & path {
      fill: white;
      stroke: white;
    }
  }
`

export const Separator = styled.div`
  height: 1px;
  border-top: 1px solid ${colors.lightGrey};
  margin: 10px 5px;
`
