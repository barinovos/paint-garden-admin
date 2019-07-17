import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, ContentWrapper } from './Styled'
import { Title, ItemInput, ItemTextArea, JustifiedRow, RightAlignedRow } from '../SectionModal/Styled'
import { Button } from '../Common/Styled'
import trash from '../assets/trash_.svg'
import { Icon } from '../Sections/Styled'

export default class PinModal extends React.PureComponent {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    pin: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = props.pin || {
      headline: '',
      medium: '',
      description: '',
      image: '',
    }
  }

  onChangeState = prop => ev => this.setState({ [prop]: ev.target.value })

  onSaveChanges = () => {
    this.props.onSave(this.state)
    this.props.onClose()
  }

  render() {
    const { onClose, onDelete } = this.props
    const { headline, medium, description, id } = this.state

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
          <ItemInput value={headline} onChange={this.onChangeState('headline')} placeholder="Headline" />
          <ItemInput value={medium} onChange={this.onChangeState('medium')} placeholder="Medium" />
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
