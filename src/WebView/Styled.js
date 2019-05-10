import styled from 'styled-components';
import colors from '../constants/colors'

export const WebViewWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
`

export const Area = styled.div`
  background-color: rgba(0, 0, 0, .2);
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border: 2px dashed ${colors.blue};
`
