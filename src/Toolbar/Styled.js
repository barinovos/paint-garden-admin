import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 60px;
  background: white;
  display: flex;
  align-items: center;
  padding: 0 25px;
  justify-content: space-between;
`;

export const LinksArea = styled.div`
  display: flex;
`;

export const HiddenInput = styled.input.attrs({
  type: 'file',
  multiple: true,
  accept: 'image/*',
})`
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  opacity: 0;
  width: 170px;
  cursor: pointer;
`;
