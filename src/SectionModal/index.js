import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, ContentWrapper } from './Styled'
import { Button, Title, ItemInput, ItemTextArea, JustifiedRow, RightAlignedRow } from '../Common/Styled'

const defaultState = {
  title: '',
  height: 1000,
  width: 1000,
  depth: 0,
  medium: '',
  year: new Date().getFullYear(),
  synopisis: '',
  errors: {},
}


const minTitleLength = 6;

export default class SectionModal extends React.PureComponent {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    section: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = props.section
      ? {
          ...defaultState,
          ...props.section,
          title: props.section.title || props.section.name,
        }
      : defaultState
  }

  onChangeState = prop => ev => {
    if (this.validate(prop, ev.target.value)) {
      this.setState({ [prop]: ev.target.value })
    }
  }

  onChangeTitle = prop => ev => {
    let errors = {};
    if (ev.target.value.length < minTitleLength) {
      errors["title"] = `Tittle has to be longer than ${minTitleLength}`;
      this.setState({errors: errors});
    } else {
      errors["title"] = '';
      this.setState({errors: errors});
    }

    this.setState({ [prop]: ev.target.value })
    return true;
  }

  validate(prop, val) {
    switch (prop) {
      case 'height':
      case 'width':
      case 'depth':
      case 'year':
        return validateNumber(val)
      default:
        return true
    }
  }

  onSaveChanges = () => {
    const { height, width, depth, year, title } = this.state
    // Title length validation
    if (title.length >= minTitleLength) {
      this.props.onSave({
        ...this.state,
        width: width ? +width : null,
        height: height ? +height : null,
        depth: depth ? +depth : null,
        year: year ? +year : null,
      })
    } else {

    }
  }

  render() {
    const { onClose } = this.props
    const { title, synopisis, width, height, depth, medium, year } = this.state

    return (
      <Wrapper onClick={onClose}>
        <ContentWrapper onClick={ev => ev.stopPropagation()}>
          <Title>Section detail</Title>
          <ItemInput
            value={title}
            onChange={this.onChangeTitle('title')}
            name= "title"
          placeholder="Title"
         />
         <span style={{color: "red"}}>{this.state.errors["title"]}</span>
          <ItemTextArea value={synopisis} onChange={this.onChangeState('synopisis')} placeholder="Synopisis" />
          <JustifiedRow>
            <ItemInput value={height} onChange={this.onChangeState('height')} placeholder="Height" width={30} />
            <span style={{color: "red"}}>{this.state.errors["height"]}</span>
            <ItemInput value={width} onChange={this.onChangeState('width')} placeholder="Width" width={30} />
            <span style={{color: "red"}}>{this.state.errors["width"]}</span>
            <ItemInput value={depth} onChange={this.onChangeState('depth')} placeholder="Depth" width={30} />
            <span style={{color: "red"}}>{this.state.errors["depth"]}</span>
          </JustifiedRow>
          <JustifiedRow>
            <ItemInput value={medium} onChange={this.onChangeState('medium')} placeholder="Medium" width={65} />
            <ItemInput value={year} onChange={this.onChangeState('year')} placeholder="Year" width={30} />
             <span style={{color: "red"}}>{this.state.errors["year"]}</span>
          </JustifiedRow>
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

function validateNumber(string) {
  return string === '' || /^\d+$/.test(string)
}
