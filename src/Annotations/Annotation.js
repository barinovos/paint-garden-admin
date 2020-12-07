import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Button from '../components/Button'
import TextArea from '../components/TextArea'
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
  RepliesContainer,
  OptionsPanel,
} from './Styled'
import { FlexLayout } from '../Common/Styled'
import { ReactComponent as AttachIcon } from '../assets/attach.svg'
// import { ReactComponent as AudioIcon } from '../assets/audio.svg'
import { ReactComponent as OptionsIcon } from '../assets/options.svg'
import { ReactComponent as PinIcon } from '../assets/Pin_active.svg'

const InputForm = ({ commentText, mediaFiles, onSetText, onSetMedia, onCancel, onComment }) => (
  <Fragment>
    <FlexLayout margin="15px 0">
      <TextArea value={commentText} onChange={ev => onSetText(ev.target.value)} placeholder="Comment" />
      <AddImage>
        <AttachIcon />
        {/* Multiple files possible */}
        <HiddenInput onChange={ev => onSetMedia(ev.target.files)} />
      </AddImage>
    </FlexLayout>
    {mediaFiles &&
      mediaFiles.map(media => <MediaThumb src={media.url || URL.createObjectURL(media)} alt={media.name} />)}
    <FlexLayout margin="0 0 12px 0">
      <Button onClick={onComment}>Comment</Button>
      <Button secondary onClick={onCancel}>
        Cancel
      </Button>
    </FlexLayout>
  </Fragment>
)

const Reply = ({
  reply,
  isActiveEdit,
  onOptionsClick,
  commentText,
  mediaFiles,
  onSetText,
  onSetMedia,
  onCancel,
  onComment,
  onDelete,
  onEditMode,
  showOptionsReply,
}) => {
  return (
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
          {/*<IconWrapper>
            <AudioIcon />
          </IconWrapper>
          <IconWrapper>
            <AttachIcon />
          </IconWrapper>*/}
          <IconWrapper
            onClick={ev => {
              ev.stopPropagation()
              onOptionsClick(reply)
            }}
          >
            <OptionsIcon />
          </IconWrapper>
        </FlexLayout>
      </FlexLayout>
      {isActiveEdit ? (
        <InputForm
          commentText={commentText || reply.text}
          mediaFiles={mediaFiles || [reply.media]}
          onCancel={onCancel}
          onComment={onComment}
          onSetText={onSetText}
          onSetMedia={onSetMedia}
        />
      ) : (
        <Fragment>
          <ReplyText>{reply.text}</ReplyText>
          {reply.media && <MediaThumb src={reply.media.url} alt={reply.media.name} />}
        </Fragment>
      )}
      {showOptionsReply && (
        <OptionsPanel>
          <p onClick={() => onEditMode(reply)}>Edit</p>
          <p onClick={() => onDelete(reply)}>Delete</p>
        </OptionsPanel>
      )}
    </ReplyWrapper>
  )
}

const Annotation = ({ data, user, position, onClose, onComment, onEdit, onDelete }) => {
  const [commentText, setText] = useState('')
  const [mediaFiles, setMediaArray] = useState([])
  const [activeEditReply, setActiveEdit] = useState(null)
  const [showOptionsReply, setShowOptions] = useState(null)
  const isNew = !data.id

  const setMedia = files => setMediaArray(Array.from(files))

  const reset = () => {
    setText('')
    setMediaArray([])
    setActiveEdit(null)
    setShowOptions(null)
  }

  const onCommentClick = () => {
    const pin = {
      text: commentText,
      position,
    }
    if (!isNew) {
      pin.parent_id = data.id
    }
    onComment(pin, mediaFiles)
    reset()
  }

  const onEditClick = pin => {
    const data = {
      ...pin,
      text: commentText || pin.text,
    }
    onEdit(data, mediaFiles)
    reset()
  }

  const onSelectForEdit = pin => {
    setText(pin.text)
    setMedia(Array.isArray(pin.media) ? pin.media : pin.media ? [pin.media] : [])
    setActiveEdit(pin)
  }

  return (
    <CommentModal
      left={`${+position.x + 40}px`}
      top={`${+position.y - 72}px`}
      onClick={ev => {
        setShowOptions(null)
        ev.stopPropagation()
      }}
    >
      <ActivePin>
        <PinIcon />
      </ActivePin>
      {!isNew ? (
        <RepliesContainer>
          {[data, ...data.replies].map(reply => (
            <Reply
              key={reply.id}
              reply={reply}
              isActiveEdit={activeEditReply && reply.id === activeEditReply.id}
              commentText={commentText}
              mediaFiles={mediaFiles}
              onSetMedia={setMedia}
              onSetText={setText}
              onComment={onEditClick}
              onCancel={() => setActiveEdit(null)}
              showOptionsReply={showOptionsReply && reply.id === showOptionsReply.id}
              onEditMode={onSelectForEdit}
              onDelete={onDelete}
              onOptionsClick={setShowOptions}
            />
          ))}
        </RepliesContainer>
      ) : (
        <FlexLayout style={{ paddingTop: 15 }}>
          <Avatar>{user.name[0]}</Avatar>
          <h2>{user.name}</h2>
        </FlexLayout>
      )}
      {!activeEditReply && (
        <InputForm
          commentText={commentText}
          mediaFiles={mediaFiles}
          onSetMedia={setMedia}
          onSetText={setText}
          onComment={onCommentClick}
          onCancel={onClose}
        />
      )}
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
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  data: PropTypes.object,
}

export default Annotation
