import React,  { useState } from 'react'
import PropTypes from 'prop-types'
import { ModalWrapper, ContentWrapper, HiddenInput } from './Styled'
import { Button, Title, ItemInput, ItemTextArea, JustifiedRow, RightAlignedRow, AddImage } from '../Common/Styled'
import add from '../assets/add.svg'
const UploadModal = ({onSave, onClose, project_id}) => {
  const [title, setTitle]             = useState("");
  const [errors, setError]            = useState([]);
  const [temp_path, setTempPath]            = useState('');
  const [image, setImage]            = useState('');

  const minTitleLength = 6;

  const onChangeTitle = prop => ev => {
    let errors = {};
    if (ev.target.value.length < minTitleLength) {
      errors["title"] = `Tittle has to be longer than ${minTitleLength}`;
      setError({errors: errors});
    } else {
      errors["title"] = '';
      setError({errors: errors});
    }

    setTitle(ev.target.value)
    return true;
  }

  const onChangeImage = prop => ev => {
    setImage(ev.target.files[0]);
    setTempPath( URL.createObjectURL(ev.target.files[0]));
  }

  const handleSubmit = () => {
      if (title.length > minTitleLength) {
          onSave({
              project_id: project_id,
              title:title,
              image:image
          });
      }
  }



    return (
      <ModalWrapper onClick={onClose}>
        <ContentWrapper onClick={ev => ev.stopPropagation()}>
            <Title>Section detail</Title>
            <ItemInput
              value={title}
              onChange={onChangeTitle('title')}
              name= "title"
              placeholder="Title"
            />
            <span style={{color: "red"}}>{errors["title"]}</span>


            <AddImage >
                <img  style = {{maxWidth: "100%", maxHeight: "100%" }} src={temp_path ? temp_path : add} alt="upload" />
                <HiddenInput onChange={onChangeImage('image')} />
              </AddImage>

          <RightAlignedRow>
                <Button onClick={onClose} secondary>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>Save</Button>
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
