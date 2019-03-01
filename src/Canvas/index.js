import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateCanvas, fetchData } from '../Sections/actions'
import { ActionButton, ActionsBar, Wrapper, SubActionsBar, ZoomButtons, ZoomButton } from './Styled'
import DndArea from '../DndArea'
import { ImageType, SectionType } from '../types'

class Canvas extends React.PureComponent {
  static propTypes = {
    sections: PropTypes.arrayOf(SectionType),
    images: PropTypes.arrayOf(ImageType),
    updateCanvas: PropTypes.func,
    fetchData: PropTypes.func,
  }

  constructor(props) {
    super(props)
    props.fetchData()
    this.state = {
      selectedSection: null,
      zoomLevel: 0
    }
  }

  onSectionSelect = sId => this.setState({ selectedSection: this.props.sections.find(s => s.id === sId) })

  render() {
    const { images, sections, updateCanvas } = this.props
    const { selectedSection, zoomLevel } = this.state
    const sectionName = selectedSection ? selectedSection.name : 'No section selected'
    const dndItems = sections.filter(s => s.canvas && s.imageIds.length).map(s => ({
      id: s.id,
      path: images.find(im => im.id === s.imageIds[s.imageIds.length - 1]).filePath,
      ...s.canvas,
    }))

    return (
      <Wrapper>
        <ActionsBar>
          <span>{sectionName}</span>
          <SubActionsBar>
            <ActionButton>Define web view</ActionButton>
            <ActionButton>Add pin</ActionButton>
            <ZoomButtons>
              <ZoomButton onClick={() => zoomLevel > -5 && this.setState({ zoomLevel: zoomLevel - 1 })}>-</ZoomButton>
              <ZoomButton onClick={() => zoomLevel < 5 && this.setState({ zoomLevel: zoomLevel + 1 })}>+</ZoomButton>
            </ZoomButtons>
            <span>Zoom level: {zoomLevel}</span>
          </SubActionsBar>
        </ActionsBar>
        <DndArea
          zoomLevel={zoomLevel}
          dndItems={dndItems}
          onDropImage={updateCanvas}
          onSelect={this.onSectionSelect}
          selectedItemId={selectedSection ? selectedSection.id : null}
        />
      </Wrapper>
    )
  }
}

export default connect(
  ({ images, sections }) => ({ images, sections }),
  dispatch => bindActionCreators({ updateCanvas, fetchData }, dispatch),
)(Canvas)
