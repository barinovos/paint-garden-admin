import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ModalWrapper, ContentWrapper, HiddenInput } from './Styled'
import { Button, Title, ItemInput, JustifiedRow, RightAlignedRow, AddImage } from '../Common/Styled'
import add from '../assets/add.svg'

const UploadModal = ({ onSave, onClose, project_id }) => {
  const [title, setTitle] = useState('')
  const [errors, setError] = useState([])
  const [temp_path, setTempPath] = useState('')
  const [image, setImage] = useState('')
  const [values, setValues] = useState({})

  const minTitleLength = 6

  const onChangeTitle = prop => ev => {
    let text = ''
    if (ev.target.value.length < minTitleLength) {
      text = `Tittle has to be longer than ${minTitleLength}`
      setError({ ...errors, title: text })
    } else {
      text = ''
      setError({ ...errors, title: text })
    }

    setTitle(ev.target.value)
    return true
  }

  const onChangeImage = prop => ev => {
    setImage(ev.target.files[0])
    setTempPath(URL.createObjectURL(ev.target.files[0]))
  }

  const handleSubmit = () => {
    const { height, width } = values
    if (title.length > minTitleLength) {
      onSave({
        project_id: project_id,
        title: title,
        images: [image],
        width: width ? +width : 500,
        height: height ? +height : 500,
      })
    }
  }

  const onChangeState = prop => ev => {
    if (validate(prop, ev.target.value)) {
      setValues({ ...values, [prop]: ev.target.value })
    } else {
      setError({ ...errors, [prop]: prop.charAt(0).toUpperCase() + prop.slice(1) + ' needs to be a number' })
    }
  }

  const validate = (prop, val) => {
    switch (prop) {
      case 'height':
      case 'width':
        return validateNumber(val)
      default:
        return true
    }
  }

  return (
    <ModalWrapper onClick={onClose}>
      <ContentWrapper onClick={ev => ev.stopPropagation()}>
        <Title>Section detail</Title>
        <ItemInput value={title} onChange={onChangeTitle('title')} name="title" placeholder="Title" />
        <span style={{ color: 'red' }}>{errors['title']}</span>
        <JustifiedRow>
          <ItemInput onChange={onChangeState('height')} placeholder="Height" width={30} />
          <ItemInput onChange={onChangeState('width')} placeholder="Width" width={30} />
        </JustifiedRow>

        <AddImage>
          <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={temp_path ? temp_path : add} alt="upload" />
          <HiddenInput onChange={onChangeImage('image')} />
        </AddImage>

        <p style={{ color: 'red' }}>{errors['height']}</p>
        <p style={{ color: 'red' }}>{errors['width']}</p>
        <RightAlignedRow>
          <Button onClick={onClose} secondary>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create</Button>
        </RightAlignedRow>
      </ContentWrapper>
    </ModalWrapper>
  )
}

UploadModal.propTypes = {
  onSave: PropTypes.func,
  onClose: PropTypes.func,
}

export default UploadModal

function validateNumber(string) {
  return string === '' || /^\d+$/.test(string)
}
