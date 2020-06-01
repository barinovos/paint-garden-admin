import styled from 'styled-components'

export const Wrapper = styled.div`
    background-color: #fff;
    position: absolute;
    top: 10px;
    left: 20px;
    z-index: 20000;
    padding: 12px 11px;
    border-radius: 4px;
`
export const OtherWrapper = styled.div`
    background-color: #fff;
    position: absolute;
    top: 70px;
    left: 30px;
    z-index: 20000;
    padding: 12px 11px;
    border-radius: 4px;
    width: calc(100% - 30px);
`

export const Logo = styled.img`
  width: 3rem;
  height: 3rem;
  padding-right: 10px;
  border-right: 1px solid #F0F3F4;

  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
  }
`

export const CanvasName = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
`
