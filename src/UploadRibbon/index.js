import React from 'react'
import { Wrapper, ImageWrapper, UploadButton, HiddenInput } from './Styled'
import upload from '../assets/upload_ribbon.svg'
import close from '../assets/close.svg'
import trash from '../assets/trash.svg'
import { Icon } from '../Common/Styled'

const UploadRibbon = ({ item, uploadImages, project_id, onChangeActiveImageIndex, deleteSection, deleteImage }) => {
  return (
    <Wrapper>
      <UploadButton>
        <HiddenInput onChange={ev => uploadImages({ images: ev.target.files, project_id: project_id }, item.id)} />
        <Icon
          style={{ padding: '6px 7px', paddingRight: '20px', borderRight: '1px solid #F0F3F4', marginRight: '10px' }}
          src={upload}
        />
      </UploadButton>
      {item.images_section &&
        item.images_section.map((image, i) => (
          <ImageWrapper key={image.id}>
            <img
              alt={image.id}
              key={i}
              src={image.url_thumb}
              style={{
                width: '35px',
                marginLeft: '10px',
                border: item.path === image.url ? 'solid 1px #4DA1FF' : 'none',
              }}
              onClick={() => onChangeActiveImageIndex(i)}
            />
            <div
              style={{
                width: '10px',
                height: '10px',
                top: '-5px',
                right: '-5px',
                backgroundColor: '#000',
                borderRadius: '20px',
                position: 'absolute',
                color: '#fff',
                fontSize: '5px',
              }}
              onClick={() => deleteImage(image.id, item.id)}
            >
              <Icon src={close} style={{ position: 'absolute', width: '8px', right: '-6px', verticalAlign: 'top' }} />
            </div>
          </ImageWrapper>
        ))}

      <Icon
        src={trash}
        style={{ marginLeft: '15px', borderLeft: '1px solid rgb(240, 243, 244)', paddingLeft: '7px' }}
        onClick={() => deleteSection(item.id)}
      />
    </Wrapper>
  )
}

export default UploadRibbon
