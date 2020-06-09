import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, ContentWrapper, AddImage, Image, HiddenInput } from './Styled'
import { Title, Button, ItemInput, ItemTextArea, JustifiedRow, RightAlignedRow, Icon } from '../Common/Styled'
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
      temp_path: '',
      image: '',
      image_url: '',
      headline: '',
      medium: '',
      description: '',
      url: '',
      link: '',
    }
  }

  onChangeState = prop => ev => {
    if (prop !== 'image') {
      this.setState({ [prop]: ev.target.value })
    } else {
      this.setState({ [prop]: ev.target.files[0] })
      this.setState({ temp_path: URL.createObjectURL(ev.target.files[0]) })
    }
  }

  onSaveChanges = () => {
    delete this.state.temp_path
    this.props.onSave(this.state)
    this.props.onClose()
  }

  onUpload = ev => {
    this.props.onImageUpload(ev.target.files[0], this.state.id)
    this.setState({ temp_path: URL.createObjectURL(ev.target.files[0]) })
    //this.props.onClose()
  }

  render() {
    const { onClose, onDelete } = this.props
    const { temp_path, image, image_url, headline, medium, description, id, link, url } = this.state

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
          {id ?
            (url ? (
              <Image src={url} />
            ) : (
              <AddImage>
                <img style = {{maxWidth: "100%", maxHeight: "100%" }} src={temp_path ? temp_path : (image_url ? image_url : add)} alt="upload" />
                <HiddenInput onChange={this.onUpload} />
              </AddImage>
            )) : (
              <AddImage >
                <img  style = {{maxWidth: "100%", maxHeight: "100%" }} src={temp_path ? temp_path : add} alt="upload" />
                <HiddenInput onChange={this.onChangeState('image')} />
              </AddImage>
            )}
          <ItemInput value={headline} onChange={this.onChangeState('headline')} placeholder="Headline" />
          <ItemTextArea value={description} onChange={this.onChangeState('description')} placeholder="Description" />
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
