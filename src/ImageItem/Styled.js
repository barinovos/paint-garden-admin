import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
`

export const Image = styled.img`
  width: 108px;
  height: 108px;
  margin-right: 15px;
`;

export const Icons = styled.div`
  position: absolute;
  background: white;
  top: 0;
  right: 15px;
  padding-top: 4px;
  padding-left: 7px;
  transform: translateY(-26px);
  transition: transform ease-in .3s;
  
  ${Wrapper}:hover & {
    transform: translateY(0px);
  }
`
