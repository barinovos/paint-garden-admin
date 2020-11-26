import React from 'react'
import styled from 'styled-components'
import colors from '../constants/colors'
import { getLogoutURL } from '../utils/auth'
import { ReactComponent as Logo } from '../assets/logo.svg'

const Wrapper = styled.div`
  height: 60px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 25px;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.lightGrey2};
`

const Logout = styled.a`
  font-size: 15px;
  line-height: 18px;
`

const Toolbar = () => (
  <Wrapper>
    <Logo />
    <Logout href={getLogoutURL()}>Log out</Logout>
  </Wrapper>
)

export default Toolbar
