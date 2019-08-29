import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

export const LoaderView = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

export const Logo = styled.img.attrs({ alt: 'Loading' })`
  width: 4rem;
  height: 4rem;
  animation: ${pulse} 1s infinite;
`
