import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Wrapper, ContentWrapper, TextArea } from './Styled'
import { Button, Title, JustifiedRow, RightAlignedRow } from '../Common/Styled'
import { ProjectType } from '../types'

const ProjectInviteModal = ({ onSave, onClose, projectId = null }) => {
  const [invite, setInvite] = useState('')

  const handleSubmit = () => {
    let shared_with = []
    if (invite !== '') {
      shared_with = invite.split(' ')
    }
    onSave({
      id: projectId,
      shared_with: shared_with,
    })
  }

  return (
    <Wrapper onClick={onClose}>
      <ContentWrapper onClick={ev => ev.stopPropagation()}>
        <Title>Invite</Title>
        <JustifiedRow>
          <TextArea
            vvalue={invite}
            onChange={ev => setInvite(ev.target.value)}
            placeholder="Separate emails with spaces"
          />
        </JustifiedRow>
        <RightAlignedRow>
          <Button onClick={onClose} secondary>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Send invitations</Button>
        </RightAlignedRow>
      </ContentWrapper>
    </Wrapper>
  )
}

ProjectInviteModal.propTypes = {
  onSave: PropTypes.func,
  updateProject: ProjectType,
  onClose: PropTypes.func,
}

export default ProjectInviteModal
