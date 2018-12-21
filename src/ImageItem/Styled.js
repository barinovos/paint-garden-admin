import styled from 'styled-components';

const grey = '#979797';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Thumb = styled.img`
  width: 38px;
  border: 1px solid ${grey};
`;

export const ItemInput = styled.input`
  border-radius: 6px;
  background: white;
  border: 1px solid ${grey};
  outline: none;
  width: 90%;
  height: 36px;
  padding: 0 7px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  line-height: 22px;
  font-family: 'Poppins', sans-serif;

  &:active,
  &:focus {
    outline: none;
  }
`;

export const InputButton = styled.div`
  width: 36px;
  height: 38px;
  border-radius: 6px;
  background: white;
  border: 1px solid ${grey};
  font-size: 18px;
  line-height: 36px;
  text-align: center;
  margin-right: 2px;
  cursor: pointer;

  &:hover {
    background: lightgrey;
  }
`;
