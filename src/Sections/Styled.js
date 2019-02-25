import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const Icon = styled.img.attrs({ alt: ''})`
  cursor: pointer;
  margin-right: 7px;
`

export const Column = styled.div`
  margin-bottom: 25px;
`

export const SectionsInnerArea = styled.div`padding-left: 25px; padding-top: 10px`

export const EmptyImages = styled.div`font-style: italic; font-weight: 300; color: lightgrey; margin-bottom: 20px`
