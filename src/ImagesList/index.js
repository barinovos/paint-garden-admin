import React from 'react';
import PropTypes from 'prop-types';
import ImageItem from '../ImageItem';
import { Wrapper } from './Styled'
import { ImageType } from '../types'

const ImagesList = ({ images, onDelete }) => (
  <Wrapper>
    {images && images.map(data => (
      <ImageItem item={data} key={data.id} onDelete={onDelete}/>
    ))}
  </Wrapper>
)

ImagesList.propTypes = {
  images: PropTypes.arrayOf(ImageType).isRequired,
  onDelete: PropTypes.func,
}

export default ImagesList
