import styled from 'styled-components';
import colors from '../constants/colors';

export const ActionsBar = styled.div`
  display: flex;
  padding: 0 15px 10px;
`;

export const ActionButton = styled.div`
  margin-right: 30px;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
    color: ${colors.blue}
  }
`;
