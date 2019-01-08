import styled from 'styled-components';

export const HiddenInput = styled.input.attrs({
  type: 'file',
  multiple: true,
  accept: 'image/*'
})`
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  opacity: 0;
  width: 170px;
  cursor: pointer;
`;
