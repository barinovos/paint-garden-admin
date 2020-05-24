import styled from 'styled-components'

export const Wrapper = styled.div`
position: absolute;
top:0px;
left: 0px;
cursor: pointer;
height: 100%;
width: 100%;
z-index: 15000;
`

export const ModalWrapper = styled.div`
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
  z-index: 15001;
`
export const ContentWrapper = styled.form`
  width: 450px;
  background: white;
  box-shadow: 2px 3px 22px rgba(0, 0, 0, 0.5);
  border-radius: 2px;
  padding: 18px 21px;
`
export const HiddenInput = styled.input.attrs({
  type: 'file',
  multiple: true,
  accept: 'image/*,video/*'
})`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
`
