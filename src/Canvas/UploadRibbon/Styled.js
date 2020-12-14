import styled from 'styled-components'
import colors from '../../constants/colors'
import { Icon } from '../../Common/Styled'

export const Wrapper = styled.div`
  position: absolute;
  top: -70px;
  cursor: pointer;
  height: 50px;
  max-height: 50px;
  z-index: 2000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  width: calc(100% + 86px);
`

export const ImagesWrapper = styled.div`
  max-width: 100%;
  overflow-y: auto;
  display: flex;
  align-items: center;
  padding-left: 7px;
`

export const UploadButtonWrapper = styled.div`
  border-right: 1px solid ${colors.lightGrey2};
  margin-right: 10px;
`

export const Image = styled.img`
  width: 35px;
  margin-right: 10px;
  border: ${props => (props.withBorder ? `2px solid ${colors.blue}` : 'none')};
  ${props => props.withBorder && `box-shadow: 0 0 3px 2px ${colors.blue}`};
`

export const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ActionIcon = styled(Icon)`
  margin-right: 0;
  border-left: 1px solid ${colors.lightGrey2};
  padding-left: 5px;
  padding-right: 5px;
`

export const DeleteImageIcon = styled(Icon)`
  position: absolute;
  width: 18px;
  top: 1px;
  right: 3px;
  display: none;

  ${ImageWrapper}:hover & {
    display: block;
  }
`
