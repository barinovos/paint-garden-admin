import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'

export const Wrapper = styled.div`
  background-color: #fff;
  position: absolute;
  top: 10px;
  left: 20px;
  z-index: 20001;
  padding: 15px;
  border-radius: 4px;
  display: flex;
  font-size: 15px;
  font-weight: normal;
`

export const CanvasName = styled.div`
  display: inline-block;
  padding: 3px;
  padding-left: 21px;
`

export const Link = styled(RouterLink)`
  display: flex;
  align-items: center;
  padding-right: 21px;
  border-right: 1px solid #f0f3f4;
`

export const Arrow = styled.img`
  width: 16px;
  height: 11px;
  margin-right: 13.5px;
  display: inline-block;
  vertical-align: middle;

  transform: rotate(90deg);
`
