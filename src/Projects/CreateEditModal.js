import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../components/Button'
import Modal from '../components/Modal'
import Input from '../components/Input'
import { TitleWrapper, ErrorText } from './Styled'
import { Title, JustifiedRow, RightAlignedRow, Icon } from '../Common/Styled'
import { ProjectType } from '../types'
// icons
import trash from '../assets/trash_.svg'

const TITLE_LENGTH = 6

const CreateEditModal = ({ onSave, onClose, onDelete, entity, isProjectEntity }) => {
  const [title, setTitle] = useState(entity ? entity.title : '')
  const [errors, setError] = useState([])
  const [id] = useState(entity ? entity.id : null)

  const handleSubmit = () => {
    if (title.length > TITLE_LENGTH) {
      const data = {
        id,
        title,
      }
      onSave(data)
    }
  }

  const handleChange = ({ target: { value } }) => {
    const errors = {}
    if (value.length < TITLE_LENGTH) {
      errors.title = `Length of the title must be bigger than ${TITLE_LENGTH}`
      setError(errors)
    } else {
      setError({})
    }
    setTitle(value)
  }
  const deleteProject = () => {
    onDelete(entity.id)
    onClose()
  }

  return (
    <Modal onClick={onClose}>
      <TitleWrapper>
        <Title style={{ margin: '0' }}>{isProjectEntity ? 'Project' : 'Canvas'} detail</Title>
        {entity && <Icon style={{ display: 'inline-block', marginLeft: '10px' }} src={trash} onClick={deleteProject} />}
      </TitleWrapper>
      <JustifiedRow>
        <Input value={title} onChange={handleChange} placeholder="Title" />
      </JustifiedRow>
      <ErrorText>{errors.title}</ErrorText>
      <RightAlignedRow>
        <Button onClick={onClose} secondary>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save</Button>
      </RightAlignedRow>
    </Modal>
  )
}

CreateEditModal.propTypes = {
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  isProjectEntity: PropTypes.bool,
  entity: ProjectType,
}
export default CreateEditModal
