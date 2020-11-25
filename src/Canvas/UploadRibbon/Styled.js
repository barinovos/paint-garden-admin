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
  justify-content: left;
  align-items: center;
  background-color: #fff;
  padding: 7px;
`

export const ImagesWrapper = styled.div`
  min-width: 150px;
  max-width: 150px;
`

export const Image = styled.img`
  width: 35px;
  margin-left: 10px;
  border: ${props => (props.withBorder ? `1px solid ${colors.blue}` : 'none')};
`

export const ImageWrapper = styled.div`
  position: relative;
`

export const UploadButtonWrapper = styled.div`
  border-right: 1px solid ${colors.lightGrey2};
  margin-right: 10px;
`

export const TrashIcon = styled(Icon)`
  margin-left: 15px;
  border-left: 1px solid ${colors.lightGrey2};
  padding-left: 7px;
`

export const CloseIcon = styled(Icon)`
  position: absolute;
  width: 8px;
  right: -6px;
  vertical-align: top;
`

export const DeleteIcon = styled.div`
  width: 10px;
  height: 10px;
  top: -5px;
  right: -5px;
  background-color: #000;
  border-radius: 20px;
  position: absolute;
  color: #fff;
  font-size: 5px;
`
