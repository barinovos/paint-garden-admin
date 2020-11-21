import React from 'react'
import { Wrapper, ImageWrapper, Image, UploadButtonWrapper, TrashIcon, DeleteIcon, CloseIcon } from './Styled'
import close from '../assets/close.svg'
import trash from '../assets/trash.svg'
import UploadButton from '../UploadButton'

const UploadRibbon = ({ item, uploadImages, projectId, onChangeActiveImageIndex, deleteSection, deleteImage }) => {
  return (
    <Wrapper>
      <UploadButtonWrapper>
        <UploadButton onUpload={files => uploadImages(files, projectId)} />
      </UploadButtonWrapper>
      {item.history &&
        item.history.map((image, i) => (
          <ImageWrapper key={image.id}>
            <Image
              alt={image.id}
              key={i}
              src={image.thumb}
              withBorder={item.media.url === image.url}
              onClick={() => onChangeActiveImageIndex(i)}
            />
            <DeleteIcon onClick={() => deleteImage(image.id, item.id)}>
              <CloseIcon src={close} />
            </DeleteIcon>
          </ImageWrapper>
        ))}

      <TrashIcon src={trash} onClick={() => deleteSection(item.id)} />
    </Wrapper>
  )
}

export default UploadRibbon
