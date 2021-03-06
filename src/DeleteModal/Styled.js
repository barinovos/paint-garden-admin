import styled from 'styled-components'

export const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export const ContentWrapper = styled.div`
  width: 300px;
  background: white;
  box-shadow: 2px 3px 22px rgba(0, 0, 0, 0.5);
  border-radius: 2px;
  padding: 18px 21px;
`

export const Header = styled.div`
  font-size: 1.2em;
  text-align: center;
  margin-bottom: 1em;
`

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
