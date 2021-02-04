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
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #4da1ff;

  & svg {
    animation: ${rotate} 2s linear infinite;
  }
`

const LoaderContent = styled.h5`
  margin-left: 10px;
  font-weight: 600;
`

const PageLoader = () => (
  <PageLoaderWrapper>
    <Logo />
    <LoaderContent>Awesome content loading...</LoaderContent>
  </PageLoaderWrapper>
)

export default PageLoader
