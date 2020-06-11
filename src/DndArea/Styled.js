import styled from 'styled-components'

export const Area = styled.div`
  width: 100%;
  min-height: 600px;
  height: 100%;
  background: #eee;
  position: relative;
  overflow: auto;
`

export const InnerArea = styled.div`
  min-width: 100%;
  min-height: 100%;
`

export const PreviewLink = styled.div`
  background: rgba(0, 0, 0, 0.59);
  border-radius: 4px;
  position: fixed;
  z-index: 20000;
  top: 0;
  right: 0;
  font-size: 13px;
  font-family: Spartan Light, sans-serif;
  padding: 15px;
  color: #ffffff;
`

export const Link = styled.a`
  display: inline-block;
  color: #4da1ff;
  margin-left: 10px;
`
