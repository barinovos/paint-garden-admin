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

export const LoginInput = styled(ItemInput)`
  width: 90%;
  ${props => props.error && `border: 1px solid ${colors.red}`};

  @media (min-width: 768px) {
    width: 250px;
  }
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
  color: ${colors.blue};
`

export const ErrorMessage = styled.p`
  margin-top: 1em;
  color: ${colors.red};
  text-align: center;
`
