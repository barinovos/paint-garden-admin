import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import TextArea from '../../components/TextArea'
import { Title, JustifiedRow, RightAlignedRow, ErrorMessage } from '../../Common/Styled'
import { ProjectType } from '../../types'
import { parseEmails, validateEmails } from '../../utils/invite'

const ProjectInviteModal = ({ onSave, onClose, projectId = null }) => {
  const [invite, setInvite] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = () => {
    const emails = parseEmails(invite)
    if (validateEmails(emails)) {
      return onSave({
        id: projectId,
        shared_with: emails,
      })
        .then(onClose)
        .catch(err => setError(true))
    }
    setError(true)
  }

  return (
    <Modal onClick={onClose}>
      <Title>Invite</Title>
      <JustifiedRow direction="column">
        <TextArea
          height={150}
          error={error}
          value={invite}
          onChange={ev => {
            setInvite(ev.target.value)
            setError(false)
          }}
          placeholder="Separate emails with spaces"
        />
        {error && <ErrorMessage>Some of your emails are invalid</ErrorMessage>}
      </JustifiedRow>
      <RightAlignedRow>
        <Button onClick={onClose} secondary>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!invite.trim()}>
          Send invitations
        </Button>
      </RightAlignedRow>
    </Modal>
  )
}

ProjectInviteModal.propTypes = {
  onSave: PropTypes.func,
  updateProject: ProjectType,
  onClose: PropTypes.func,
}

export default ProjectInviteModal
