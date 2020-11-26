import React from 'react'
import styled, { keyframes } from 'styled-components'
import { ReactComponent as Logo } from '../../assets/logo.svg'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const PageLoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & svg {
    animation: ${rotate} 2s linear infinite;
  }
`

const PageLoader = () => (
  <PageLoaderWrapper>
    <Logo />
  </PageLoaderWrapper>
)

export default PageLoader
