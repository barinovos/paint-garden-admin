import React from 'react';
import PropTypes from 'prop-types';
import ImageItem from '../ImageItem';
import { Wrapper } from './Styled'
import { ImageType } from '../types'

const ImagesList = ({ images, deleteImage }) => (
  <Wrapper>
    {images && images.map(data => (
      <ImageItem item={data} key={data.id} deleteImage={deleteImage}/>
    ))}
  </Wrapper>
)

ImagesList.propTypes = {
  images: PropTypes.arrayOf(ImageType).isRequired,
  deleteImage: PropTypes.func,
}

export default ImagesList
