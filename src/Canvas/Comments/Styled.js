import styled from 'styled-components'
import colors from '../../constants/colors'

export const ClosedWrapper = styled.a`
  background-color: #fff;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 30px;
  z-index: 2000;
  padding: 10px 15px 0;
  border-radius: 4px;

  & svg {
    stroke: black;
  }
`

export const ListWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background: white;
  height: 100vh;
  width: 317px;
  z-index: 2000;
`

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  border-bottom: 1px solid ${colors.lightGrey2};

  & rect {
    fill: black;
  }
`

export const ListItem = styled.div`
  padding: 20px 30px;
  border-bottom: 1px solid ${colors.lightGrey2};
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    background-color: ${colors.lightGrey2};
  }

  ${props => props.active && `background-color: ${colors.lightGrey2}`}
`

export const Date = styled.div`
  color: ${colors.darkGrey};
  font-size: 11px;
  font-weight: 400;
`
