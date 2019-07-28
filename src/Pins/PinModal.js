import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, ContentWrapper, AddImage, Image, HiddenInput } from './Styled'
import { Title, Button, ItemInput, ItemTextArea, JustifiedRow, RightAlignedRow, Icon } from '../Common/Styled'
import api from '../utils/api'
import trash from '../assets/trash_.svg'
import add from '../assets/add.svg'

export default class PinModal extends React.PureComponent {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onImageUpload: PropTypes.func,
    onDelete: PropTypes.func,
    pin: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = props.pin || {
      headline: '',
      medium: '',
      description: '',
      imageUrl: '',
      link: '',
    }
  }

  onChangeState = prop => ev => this.setState({ [prop]: ev.target.value })

  onSaveChanges = () => {
    this.props.onSave(this.state)
    this.props.onClose()
  }

  onUpload = ev => {
    this.props.onImageUpload(ev.target.files[0], this.state.id)
    this.props.onClose()
  }

  render() {
    const { onClose, onDelete } = this.props
    const { headline, medium, description, id, link, imageUrl } = this.state

    return (
      <Wrapper onClick={onClose}>
        <ContentWrapper onClick={ev => ev.stopPropagation()}>
          <JustifiedRow>
            <Title>Annotation</Title>
            {id && (
              <Icon
                src={trash}
                onClick={() => {
                  onDelete(id)
                  onClose()
                }}
              />
            )}
          </JustifiedRow>
          {id &&
            (imageUrl ? (
              <Image src={api.getImageUrl(imageUrl)} />
            ) : (
              <AddImage>
                <img src={add} alt="upload" />
                <HiddenInput onChange={this.onUpload} />
              </AddImage>
            ))}
          <ItemInput value={headline} onChange={this.onChangeState('headline')} placeholder="Headline" />
          <ItemInput value={medium} onChange={this.onChangeState('medium')} placeholder="Medium" />
          <ItemTextArea value={description} onChange={this.onChangeState('description')} placeholder="Description" />
          <ItemInput value={link} onChange={this.onChangeState('link')} placeholder="Hyperlink to Store (buy here)" />
          <RightAlignedRow>
            <Button onClick={onClose} secondary>
              Cancel
            </Button>
            <Button onClick={this.onSaveChanges}>Save</Button>
          </RightAlignedRow>
        </ContentWrapper>
      </Wrapper>
    )
  }
}
