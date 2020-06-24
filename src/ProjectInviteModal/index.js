import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Wrapper, ContentWrapper, TextArea } from './Styled'
import { Button, Title, JustifiedRow, RightAlignedRow, ErrorMessage } from '../Common/Styled'
import { ProjectType } from '../types'

const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const parseEmails = text =>
  text
    .split(/[\s\n,;]/gi)
    .map(t => t.trim())
    .filter(t => !!t)

const ProjectInviteModal = ({ onSave, onClose, projectId = null }) => {
  const [invite, setInvite] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = () => {
    const emails = parseEmails(invite)
    if (emails.every(email => re.test(email))) {
      return onSave({
        id: projectId,
        shared_with: emails,
      }).catch(err => setError(true))
    }
    setError(true)
  }

  return (
    <Wrapper onClick={onClose}>
      <ContentWrapper onClick={ev => ev.stopPropagation()}>
        <Title>Invite</Title>
        <JustifiedRow direction="column">
          <TextArea
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
