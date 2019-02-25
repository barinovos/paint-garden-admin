import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import add from '../assets/add.svg'
import edit from '../assets/edit.svg'
import trash from '../assets/trash_.svg'
import SectionModal from '../SectionModal'
import UploadButton from '../UploadButton'
import ImagesList from '../ImagesList'
import { TextBlue } from '../Common/Styled'
import { Row, Icon, Column, SectionsInnerArea, EmptyImages } from './Styled'
import { SectionType, ImageType } from '../types'

class Sections extends React.PureComponent {
  static propTypes = {
    sections: PropTypes.arrayOf(SectionType),
    images: PropTypes.arrayOf(ImageType),
    fetchData: PropTypes.func,
    addToCanvas: PropTypes.func,
    deleteSection: PropTypes.func,
    removeFromCanvas: PropTypes.func,
    updateSection: PropTypes.func,
    createSection: PropTypes.func,
    uploadImages: PropTypes.func,
  }

  state = {
    showModal: false,
    isCreate: true,
    section: null,
  }

  constructor(props) {
    super(props)
    props.fetchData()
  }

  onFinishCreateEdit = section => {
    this.setState({ showModal: false })
    this.state.isCreate ? this.props.createSection(section) : this.props.updateSection(section)
  }

  onCloseModal = () => this.setState({ showModal: false })

  render() {
    const { sections, images, uploadImages, addToCanvas, removeFromCanvas, deleteSection } = this.props

    return (
      <Fragment>
        <Row onClick={() => this.setState({ showModal: true, isCreate: true, section: null })}>
          <Icon src={add} />
          <TextBlue>Create section</TextBlue>
        </Row>
        <SectionsInnerArea>
          {sections.map(s => (
            <Column key={s.id}>
              <Row>
                <span style={{ marginRight: 10 }}>{s.name || 'Some section name'}</span>
                <Icon src={edit} onClick={() => this.setState({ showModal: true, isCreate: false, section: s })} />
                <Icon src={trash} onClick={() => deleteSection(s.id)} />
              </Row>
              {s.imageIds.length ? (
                <ImagesList images={images.filter(im => s.imageIds.includes(im.id))} />
              ) : (
                <EmptyImages>No images yet loaded for this section</EmptyImages>
              )}
              <Row>
                <UploadButton uploadImages={uploadImages} sectionId={s.id} />
                <TextBlue onClick={addToCanvas} style={{ marginLeft: 10 }}>
                  Add to canvas
                </TextBlue>
              </Row>
            </Column>
          ))}
        </SectionsInnerArea>
        {this.state.showModal && (
          <SectionModal onSave={this.onFinishCreateEdit} section={this.state.section} onClose={this.onCloseModal} />
        )}
      </Fragment>
    )
  }
}

export default connect(
  ({ images, sections }) => ({ images, sections }),
  dispatch => bindActionCreators(actions, dispatch),
)(Sections)
