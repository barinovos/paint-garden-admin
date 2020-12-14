import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import colors from '../../constants/colors'

const Primary = css`
  background: ${colors.blue};
  color: #fff;
  font-weight: bold;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: ${colors.hoverBlue};
  }
`

const Secondary = css`
  background: transparent;
  color: #000;
  margin-left: 7px;

  &:hover {
    background: ${colors.lightGrey2};
  }
`

const Alarm = css`
  background: ${colors.red2};
  color: #fff;
  font-weight: bold;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: ${colors.red};
  }
`

export const StyledButton = styled.div`
  border-radius: 4px;
  position: relative;
  display: inline-block;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  line-height: 18px;
  padding: 9px 16px;
  text-decoration: none;

  &:hover,
  &:active {
    outline: none;
  }
  ${props => (props.secondary ? Secondary : props.alarm ? Alarm : Primary)};
`

const Button = ({ children, ...props }) => <StyledButton {...props}>{children}</StyledButton>

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
}

export default Button
