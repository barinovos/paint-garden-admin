import styled, { css } from 'styled-components';
import colors from '../constants/colors';

const ButtonStyle = css`
  background: ${colors.buttonBg};
  border-radius: 6px;
  position: relative;
`;

const BasicText = css`
  font-size: 18px;
  line-height: 22px;
  font-weight: 600;
  color: ${colors.grey};
`;

export const Text = styled.div`
  ${BasicText};
`;

export const TextBlue = styled.div`
  ${BasicText};
  cursor: pointer;
  color: ${colors.blue};

  &:hover {
    text-decoration: underline;
  }
`;

export const LinkText = styled.div`
  ${BasicText};
  cursor: pointer;
  padding: 10px 20px;
  text-decoration: none;
  ${props => props.active && `color: ${colors.blue}`};
  &:hover {
    color: darkgrey;
  }
`;

export const Button = styled(LinkText)`
  ${ButtonStyle};
`;

export const MainArea = styled.div`
  height: calc(100% - 60px);
  overflow-y: auto;
  padding: 25px 50px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 10px;
`;

export const Cell = styled.div`
  flex-grow: 0;
  max-width: ${props => props.size || 33}%;
  flex-basis: ${props => props.size || 33}%;
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled.div`
  cursor: pointer;
`;
