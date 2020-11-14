import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Wrapper, ContentWrapper, Image, AddImage, HiddenInput, TitleWrapper } from './Styled'
import { Button, Title, ItemInput, JustifiedRow, RightAlignedRow, FullSizeImage, Icon } from '../../Common/Styled'
import { ProjectType } from '../../types'
import { parseEmails, validateEmails } from '../../utils/invite'
// icons
import add from '../../assets/add.svg'
import trash from '../../assets/trash_.svg'

const ProjectModal = ({ onSave, updateProject, onClose, parentId = null, onDelete }) => {
  const [title, setTitle] = useState(updateProject !== null ? updateProject.title : '')
  const [errors, setError] = useState([])
  const [id] = useState(updateProject !== null ? updateProject.id : null)
  const [tempPath, setTempPath] = useState('')
  const [imageUrl] = useState(updateProject !== null ? updateProject.image : null)
  const [image, setImage] = useState('')
  const [invite] = useState('')
  const minTitleLength = 6

  const handleSubmit = () => {
    if (title.length > minTitleLength) {
      const emails = parseEmails(invite)
      if (validateEmails(emails)) {
        onSave({
          id,
          title,
          image,
          parentId,
          shared_with: emails,
        })
      }
    }
  }

  const handleChange = ({ target: { value } }) => {
    const errors = {}
    if (value.length < minTitleLength) {
      errors.title = `Length of the title must be bigger than ${minTitleLength}`
      setError(errors)
    } else {
      setError({})
    }
    setTitle(value)
  }

  const onUploadChangeImage = ({ target: { files } }) => {
    setImage(files[0])
    setTempPath(URL.createObjectURL(files[0]))
  }

  const deleteProject = () => {
    onDelete(updateProject.id)
    onClose()
  }
  return (
    <Wrapper onClick={onClose}>
      <ContentWrapper onClick={ev => ev.stopPropagation()}>
        <TitleWrapper>
          <Title style={{ margin: '0' }}>{parentId === null ? 'Project' : 'Canvas'} detail</Title>
          {updateProject && (
            <Icon style={{ display: 'inline-block', marginLeft: '10px' }} src={trash} onClick={deleteProject} />
          )}
        </TitleWrapper>
        <JustifiedRow>
          <ItemInput value={title} onChange={handleChange} placeholder="Title" />
        </JustifiedRow>
        <span style={{ display: 'block', color: 'red', fontSize: '12px' }}>{errors.title}</span>
        {/*{id ? (*/}
        {/*  updateProject.picture ? (*/}
        {/*    <Image src={updateProject.picture} />*/}
        {/*  ) : (*/}
        {/*    <AddImage>*/}
        {/*      <FullSizeImage src={tempPath ? tempPath : imageUrl ? imageUrl : add} alt="upload" />*/}
        {/*      <HiddenInput onChange={onUploadChangeImage} />*/}
        {/*    </AddImage>*/}
        {/*  )*/}
        {/*) : (*/}
        {/*  <AddImage>*/}
        {/*    <FullSizeImage src={tempPath ? tempPath : add} alt="upload" />*/}
        {/*    <HiddenInput onChange={onUploadChangeImage} />*/}
        {/*  </AddImage>*/}
        {/*)}*/}

        <RightAlignedRow>
          <Button onClick={onClose} secondary>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </RightAlignedRow>
      </ContentWrapper>
    </Wrapper>
  )
}

ProjectModal.propTypes = {
  onSave: PropTypes.func,
  updateProject: ProjectType,
  onClose: PropTypes.func,
}
export default ProjectModal
