import styled, { css } from 'styled-components'
import colors from '../constants/colors'

export const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export const ContentWrapper = styled.div`
  width: 350px;
  height: 400px;
  background: white;
  box-shadow: 2px 3px 22px rgba(0, 0, 0, 0.5);
  border-radius: 2px;
  padding: 18px 21px;
`
export const Title = styled.div`
  font-weight: 300;
  font-size: 20px;
  margin-bottom: 20px;
`

const CommonInput = css`
  border-radius: 3px;
  background: ${colors.inputBg};
  color: ${colors.dark};
  border: none;
  outline: none;
  font-size: 10px;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  margin-bottom: 14px;

  &:active,
  &:focus {
    outline: none;
  }
`

export const ItemInput = styled.input`
  ${CommonInput};
  height: 27px;
  line-height: 27px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 16px;
  width: ${props => props.width || 100}%;
`;

export const ItemTextArea = styled.textarea`
  ${CommonInput};
  height: 117px;
  line-height: 20px;
  width: 100%;
  padding: 10px 16px;
`;

export const JustifiedRow = styled.div`display: flex; justify-content: space-between`;

export const RightAlignedRow = styled.div`display: flex; justify-content: flex-end; margin-top: 15px`
