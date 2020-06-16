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
export const ContentWrapper = styled.form`
  width: 450px;
  background: white;
  box-shadow: 2px 3px 22px rgba(0, 0, 0, 0.5);
  border-radius: 2px;
  padding: 18px 21px;
`

export const Image = styled.img`
  max-width: 100%;
  margin-bottom: 1.2em;
`

export const AddImage = styled.div`
  height: 85px;
  background: lightgray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 1.2em;
`


export const HiddenInput = styled.input.attrs({
  type: 'file',
  multiple: false,
  accept: 'image/*',
})`
  position: absolute;
  left: 0;
  top: 0;
  height: 85px;
  opacity: 0;
  width: 100%;
  cursor: pointer;
`

export const TitleWrapper = styled.div `
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

