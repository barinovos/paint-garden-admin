import React from 'react'
import { Wrapper, ImageWrapper, Image, UploadButtonWrapper, ActionIcon, DeleteImageIcon, ImagesWrapper } from './Styled'
import { FlexLayout } from '../../Common/Styled'
import trash from '../../assets/trash.svg'
import edit from '../../assets/edit.svg'
import UploadButton from '../../components/UploadButton'

const UploadRibbon = ({ item, uploadMedia, onHistoryIndexChange, deleteSection, deleteImage, activeMediaId }) => {
  console.log(item)
  return (
    <Wrapper>
      <ImagesWrapper>
        <UploadButtonWrapper>
          <UploadButton onUpload={files => uploadMedia(item.id, files)} isPlus={true} />
        </UploadButtonWrapper>
        {item.history &&
          item.history.map((image, i) => (
            <ImageWrapper key={image.id}>
              <Image
                alt={image.id}
                key={i}
                src={image.thumb}
                withBorder={activeMediaId === image.id}
                onClick={() => onHistoryIndexChange(i)}
              />
              <DeleteImageIcon src={edit} onClick={() => deleteImage(image.id, item.id)} />
            </ImageWrapper>
          ))}
      </ImagesWrapper>

      <FlexLayout justifyContent="end">
        <ActionIcon src={edit} />
        <ActionIcon src={trash} onClick={() => deleteSection(item.id)} />
      </FlexLayout>
    </Wrapper>
  )
}

export default UploadRibbon
