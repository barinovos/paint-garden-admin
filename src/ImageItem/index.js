import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, Image, Icons } from './Styled'
import { ImageType } from '../types'
import { Icon } from '../Common/Styled'
import edit from '../assets/edit.svg'
import trash from '../assets/trash_.svg'

const ImageItem = ({ item, onDelete }) => (
  <Wrapper>
    <Image src={item.url} alt={'thumb'} />
    <Icons>
      <Icon src={edit} />
      <Icon src={trash} onClick={() => onDelete(item.id)} />
    </Icons>
  </Wrapper>
  )

ImageItem.propTypes = {
  item: ImageType.isRequired,
  onDelete: PropTypes.func,
}

export default ImageItem
