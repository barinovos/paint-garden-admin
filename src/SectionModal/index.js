import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, ContentWrapper, Title, ItemInput, ItemTextArea, JustifiedRow, RightAlignedRow } from './Styled'
import { Button } from '../Common/Styled'

const defaultState = {
  name: '',
  width: '',
  length: '',
  depth: '',
  medium: '',
  year: '',
  synopisis: '',
}

export default class SectionModal extends React.PureComponent {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    section: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = props.section ? { ...defaultState, ...props.section } : defaultState
  }

  onChangeState = prop => ev => {
    if (this.validate(prop, ev.target.value)) {
      this.setState({ [prop]: ev.target.value })
    }
  }

  validate(prop, val) {
    switch (prop) {
      case 'length':
      case 'width':
      case 'depth':
      case 'year':
        return validateNumber(val)
      default:
        return true
    }
  }

  onSaveChanges = () => {
    const { length, width, depth, year } = this.state
    this.props.onSave({
      ...this.state,
      width: width ? +width : null,
      length: length ? +length : null,
      depth: depth ? +depth : null,
      year: year ? +year : null,
    })
  }

  render() {
    const { onSave, onClose } = this.props
    const { name, synopisis, width, length, depth, medium, year } = this.state

    return (
      <Wrapper onClick={onClose}>
        <ContentWrapper onClick={ev => ev.stopPropagation()}>
          <Title>Section detail</Title>
          <ItemInput value={name} onChange={this.onChangeState('name')} placeholder="Name" />
          <ItemTextArea value={synopisis} onChange={this.onChangeState('synopisis')} placeholder="Synopisis" />
          <JustifiedRow>
            <ItemInput value={length} onChange={this.onChangeState('length')} placeholder="Length" width={30} />
            <ItemInput value={width} onChange={this.onChangeState('width')} placeholder="Width" width={30} />
            <ItemInput value={depth} onChange={this.onChangeState('depth')} placeholder="Depth" width={30} />
          </JustifiedRow>
          <JustifiedRow>
            <ItemInput value={medium} onChange={this.onChangeState('medium')} placeholder="Medium" width={65} />
            <ItemInput value={year} onChange={this.onChangeState('year')} placeholder="Year" width={30} />
          </JustifiedRow>
          <RightAlignedRow>
            <Button onClick={onClose} secondary>
              Cancel
            </Button>
            <Button onClick={() => onSave(this.state)}>Save</Button>
          </RightAlignedRow>
        </ContentWrapper>
      </Wrapper>
    )
  }
}

function validateNumber(string) {
  return string === '' || /^\d+$/.test(string)
}
