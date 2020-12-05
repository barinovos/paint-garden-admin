import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Button from '../components/Button'
import Input from '../components/Input'
import {
  CommentModal,
  Avatar,
  AddImage,
  HiddenInput,
  ActivePin,
  MediaThumb,
  Date,
  IconWrapper,
  ReplyText,
  ReplyWrapper,
} from './Styled'
import { FlexLayout } from '../Common/Styled'
import { ReactComponent as AttachIcon } from '../assets/attach.svg'
import { ReactComponent as AudioIcon } from '../assets/audio.svg'
import { ReactComponent as OptionsIcon } from '../assets/options.svg'
import { ReactComponent as PinIcon } from '../assets/Pin_active.svg'

const Reply = ({ reply }) => (
  <ReplyWrapper>
    <FlexLayout justifyContent="space-between">
      <FlexLayout>
        <Avatar>{reply.user.name[0]}</Avatar>
        <div>
          <h2>{reply.user.name}</h2>
          <Date>{moment(reply.created_at).fromNow()}</Date>
        </div>
      </FlexLayout>
      <FlexLayout>
        <IconWrapper>
          <AudioIcon />
        </IconWrapper>
        <IconWrapper>
          <AttachIcon />
        </IconWrapper>
        <IconWrapper>
          <OptionsIcon />
        </IconWrapper>
      </FlexLayout>
    </FlexLayout>
    <ReplyText>{reply.text}</ReplyText>
    {reply.media && <MediaThumb src={reply.media.url} alt={reply.media.name} />}
  </ReplyWrapper>
)

const Annotation = ({ data, user, position, onClose, onComment, onEdit }) => {
  const [commentText, setText] = useState('')
  const [mediaFile, setMedia] = useState(null)
  const isNew = !data.id

  const onCommentClick = () => {
    const pin = {
      text: commentText,
      position,
    }
    if (mediaFile) {
      pin.media = mediaFile
    }
    if (!isNew) {
      pin.parent_id = data.id
    }
    onComment(pin)
  }

  return (
    <CommentModal
      left={`${position.x + 40}px`}
      top={`${position.y - 72}px`}
      onClick={ev => {
        ev.stopPropagation()
      }}
    >
      <ActivePin>
        <PinIcon />
      </ActivePin>
      {!isNew ? (
        [data, ...data.replies].map(reply => <Reply key={reply.id} reply={reply} />)
      ) : (
        <FlexLayout style={{ paddingTop: 15 }}>
          <Avatar>{user.name[0]}</Avatar>
          <h2>{user.name}</h2>
        </FlexLayout>
      )}
      <FlexLayout margin="15px 0">
        <Input value={commentText} onChange={ev => setText(ev.target.value)} placeholder="Comment" />
        {!mediaFile && (
          <AddImage>
            <AttachIcon />
            <HiddenInput onChange={ev => setMedia(ev.target.files[0])} />
          </AddImage>
        )}
      </FlexLayout>
      {mediaFile && <MediaThumb src={URL.createObjectURL(mediaFile)} alt={mediaFile.name} />}
      <FlexLayout margin="0 0 12px 0">
        <Button onClick={onCommentClick}>Comment</Button>
        <Button secondary onClick={onClose}>
          Cancel
        </Button>
      </FlexLayout>
    </CommentModal>
  )
}

Annotation.propTypes = {
  onComment: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  user: PropTypes.object,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  data: PropTypes.object,
}

export default Annotation
