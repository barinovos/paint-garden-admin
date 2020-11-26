import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../components/Button'
import Input from '../components/Input'
import { CommentModal, Avatar, AddImage, HiddenInput, ActivePin } from './Styled'
import { FlexLayout } from '../Common/Styled'
import { ReactComponent as AttachIcon } from '../assets/attach.svg'
import { ReactComponent as PinIcon } from '../assets/Pin_active.svg'

const PinModal = ({ user, position, onClose, onComment }) => {
  const [commentText, setText] = useState('')
  const [mediaFile, setMedia] = useState(null)
  return (
    <CommentModal
      left={`${position.x + 30}px`}
      top={`${position.y - 80}px`}
      onClick={ev => {
        ev.stopPropagation()
      }}
    >
      <ActivePin>
        <PinIcon />
      </ActivePin>
      <FlexLayout>
        <Avatar>{user.name[0]}</Avatar>
        <h2>{user.name}</h2>
      </FlexLayout>
      <FlexLayout margin="15px 0">
        <Input value={commentText} onChange={ev => setText(ev.target.value)} placeholder="Comment" />
        {!mediaFile && (
          <AddImage>
            <AttachIcon />
            <HiddenInput onChange={ev => setMedia(ev.target.files[0])} />
          </AddImage>
        )}
      </FlexLayout>
      <FlexLayout>
        <Button onClick={() => onComment(commentText)}>Comment</Button>
        <Button secondary onClick={onClose}>
          Cancel
        </Button>
      </FlexLayout>
      {mediaFile && <img src={URL.createObjectURL(mediaFile)} alt={mediaFile.name} />}
    </CommentModal>
  )
}

PinModal.propTypes = {
  onComment: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  user: PropTypes.object,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
}

export default PinModal
