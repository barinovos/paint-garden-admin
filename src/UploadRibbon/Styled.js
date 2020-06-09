import styled from 'styled-components'

export const Wrapper = styled.div`
position: absolute;
top: -70px;
cursor: pointer;
height: 50px;
max-height: 50px;
min-width: 200px;
z-index: 15000;
display: flex;
justify-content: left;
align-items: center;
background-color: #fff;
padding-right: 10px;
`

export const ImagesWrapper = styled.div`
min-width:150px;
max-width: 150px;
`

export const UploadButton = styled.div`
margin: 7px;
display: inline-block;
width: 35px;
height: 35px;
background-color: #4DA1FF;
border-radius: 3px;
color: #fff;
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
    margin: 7px;
    width: 35px;
    height: 35px;
  `;

  export const ImageWrapper = styled.div`
    position: relative;
  `
