import React from 'react'
import PropTypes from 'prop-types'
import { Image } from './Styled'
import api from '../utils/api'
import { ImageType } from '../types'

const ImageItem = ({ item }) => <Image src={api.getImageUrl(item.filePath)} alt={'thumb'} />

ImageItem.propTypes = {
  item: ImageType.isRequired,
  deleteImage: PropTypes.func,
}

export default ImageItem
