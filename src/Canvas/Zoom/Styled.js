import styled from 'styled-components'
import colors from '../../constants/colors'

export const Wrapper = styled.div`
  display: flex;
  border-radius: 4px;
  background: white;
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 10px 0;
  height: 60px;
  z-index: 200;
`

export const Button = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.black};
  cursor: pointer;
  text-align: center;
  user-select: none;
  font-size: 2em;
  width: 60px;
  height: 100%;

  &:first-child {
    border-right: 1px solid #f0f3f4;
  }
`
export const Value = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 70px;
  font-size: 15px;
  line-height: 18px;
`
