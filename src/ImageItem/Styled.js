import styled from 'styled-components';
import colors from '../constants/colors';

export const Image = styled.img`
  width: 108px;
  height: 108px;
  margin-right: 15px;
`;

export const ItemInput = styled.input`
  border-radius: 6px;
  background: white;
  border: 1px solid ${colors.grey};
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
  background: ${props => props.selected ? colors.blue : 'white'};
  border: 1px solid ${colors.grey};
  font-size: 18px;
  line-height: 36px;
  text-align: center;
  margin-right: 2px;
  cursor: pointer;

  &:hover {
    background: lightgrey;
  }
`;