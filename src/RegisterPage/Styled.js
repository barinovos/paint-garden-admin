import styled from 'styled-components'
import colors from '../constants/colors'
import { ItemInput } from '../Common/Styled'

export const Wrapper = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em 2em;
`

export const RegisterInput = styled(ItemInput)`
  width: 90%;
  border: 1px solid transparent;
  box-sizing: border-box;
  border-radius: 3px;
  font-family: Proxima Nova Regular;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 20px;
  color: ${colors.inputTextGray};
  ${props => props.error && `border: 1px solid ${colors.red}`};


  &:active,
  &:focus {
    border: 1px solid ${colors.formBorderBlue};
    background-color: #fff;
  }

  @media (min-width: 768px) {
    width: 350px;
  }
`

export const ButtonText = styled.p `
  padding: 6px 0;
  font-family: Proxima Nova Regular;
`

export const Logo = styled.img`
  width: 3rem;
  height: 3rem;

  @media (min-width: 768px) {
    width: 50px;
    height: 50px;
  }
`

export const Title = styled.p`
  font-weight: bold;
  margin: 1.2em 0;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */
  color: ${colors.formTitleGray};
`

export const ErrorMessage = styled.p`
  margin-top: 1em;
  color: ${colors.red};
  text-align: center;
`

export const PrivacyPolicyText = styled.p `
  margin-top: 1em;
  font-family: Proxima Nova Regular;
  font-style: normal;
  font-weight: 300;
  font-size: 9px;
  line-height: 11px;

  color: #7F7F7F;
`

export const LinkText = styled.span `
  color: #4DA1FF;
`

export const RegisterText = styled.p `
  margin-top: 1.5em;
  font-family: Proxima Nova Light;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;

  color: #000000;
`
