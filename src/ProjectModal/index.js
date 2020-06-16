import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Wrapper, ContentWrapper, Image, AddImage, HiddenInput, TitleWrapper } from './Styled'
import { Button, Title, ItemInput, JustifiedRow, RightAlignedRow } from '../Common/Styled'
import { ProjectType } from '../types'
import add from '../assets/add.svg'
import { Icon } from '../Common/Styled'
import trash from '../assets/trash_.svg'

const ProjectModal = ({ onSave, updateProject, onClose, parentId = null, onDelete }) => {
  const [title, setTitle] = useState(updateProject !== null ? updateProject.title : '')
  const [errors, setError] = useState([])
  const [project_id] = useState(updateProject !== null ? updateProject.id : null)
  const [temp_path, setTempPath] = useState('')
  const [image_url] = useState(updateProject !== null ? updateProject.image : null)
  const [image, setImage] = useState('')
  const [invite] = useState('')
  const minTitleLength = 6

  const handleSubmit = () => {
    if (title.length > minTitleLength) {
      let shared_with = []
      if (invite !== '') {
        shared_with = invite.split(',')
      }
      onSave({
        id: project_id,
        title: title,
        image: image,
        parentId: parentId,
        shared_with: shared_with,
      })
    }
  }

  const handleChange = ev => {
    const title = ev.target.value
    let errors = {}
    if (title.length < minTitleLength) {
      errors.title = `Length of the title must be bigger than ${minTitleLength}`
      setError(errors)
    } else {
      setError({})
    }
    setTitle(ev.target.value)
  }

  const onUploadChangeImage = ev => {
    setImage(ev.target.files[0])
    setTempPath(URL.createObjectURL(ev.target.files[0]))
  }

  const deleteProject = () => {
    onDelete(updateProject.id)
    onClose()
  }
  return (
    <Wrapper onClick={onClose}>
      <ContentWrapper onClick={ev => ev.stopPropagation()}>
        <TitleWrapper>
          <Title style={{ margin: '0' }}>Project detail</Title>
          {updateProject && (
            <Icon style={{ display: 'inline-block', marginLeft: '10px' }} src={trash} onClick={deleteProject} />
          )}
        </TitleWrapper>
        <JustifiedRow>
          <ItemInput value={title} onChange={handleChange} placeholder="Title" />
        </JustifiedRow>
        <span style={{ display: 'block', color: 'red', fontSize: '12px' }}>{errors.title}</span>
        {project_id ? (
          updateProject.picture ? (
            <Image src={updateProject.picture} />
          ) : (
            <AddImage>
              <img
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                src={temp_path ? temp_path : image_url ? image_url : add}
                alt="upload"
              />
              <HiddenInput onChange={onUploadChangeImage} />
            </AddImage>
          )
        ) : (
          <AddImage>
            <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={temp_path ? temp_path : add} alt="upload" />
            <HiddenInput onChange={onUploadChangeImage} />
          </AddImage>
        )}

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
