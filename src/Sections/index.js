import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import * as actions from './actions'
import add from '../assets/add.svg'
import edit from '../assets/edit.svg'
import trash from '../assets/trash_.svg'
import SectionModal from '../SectionModal'
import DeleteModal from '../DeleteModal'
import UploadButton from '../UploadButton'
import ImagesList from '../ImagesList'
import { TextBlue, Icon } from '../Common/Styled'
import { Row, Column, SectionsInnerArea, EmptyImages, SectionsWrapper } from './Styled'
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
    deleteImage: PropTypes.func,
  }

  state = {
    showModal: false,
    showDeleteModal: false,
    isCreate: true,
    section: null,
    imageIdDelete: null,
    project_id: null,
  }

  constructor(props) {
    super(props)
    const project_id = props.match.params.project_id
    this.state.project_id = project_id
    props.fetchData(project_id)
  }

  componentWillUnmount() {
    this.props.clearData()
  }

  onFinishCreateEdit = section => {
    this.setState({ showModal: false })
    this.state.isCreate ? this.props.createSection(section, this.state.project_id, this.state.canvas_id) : this.props.updateSection(section)
  }

  onCloseModal = () => this.setState({ showModal: false })

  onCloseDeleteModal = () => this.setState({ showDeleteModal: false, imageIdDelete: null })

  onDeleteImage = () => {
    this.props.deleteImage(this.state.imageIdDelete)
    this.onCloseDeleteModal()
  }

  render() {
    const { sections, images, uploadImages, addToCanvas, removeFromCanvas, deleteSection } = this.props
    const { showModal, showDeleteModal, section } = this.state

    return (
      <SectionsWrapper>
        <div style={{ marginBottom: 20 }}>
          <Link to={`/canvas/${this.state.project_id}`}>
            <TextBlue>Canvas</TextBlue>
          </Link>
        </div>
        <Row onClick={() => this.setState({ showModal: true, isCreate: true, section: null })}>
          <Icon src={add} />
          <TextBlue>Create area</TextBlue>
        </Row>
        <SectionsInnerArea>
          {sections.map(s => (
            <Column key={s.id}>
              <Row>
                <span style={{ marginRight: 10 }}>{s.title || s.name || 'Some section name'}</span>
                <Icon src={edit} onClick={() => this.setState({ showModal: true, isCreate: false, section: s })} />
                <Icon src={trash} onClick={() => deleteSection(s.id)} />
              </Row>
              {s.imageIds.length ? (
                <ImagesList
                  images={images.filter(im => s.imageIds.includes(im.id))}
                  onDelete={imageIdDelete => this.setState({ showDeleteModal: true, imageIdDelete })}
                />
              ) : (
                <EmptyImages>No images yet loaded for this section</EmptyImages>
              )}
              <Row>
                <UploadButton uploadImages={uploadImages} sectionId={s.id} projectId={this.state.project_id} />
                {s.imageIds.length ? (
                  s.canvas ? (
                    <TextBlue onClick={() => removeFromCanvas(s.id)} style={{ marginLeft: 10 }}>
                      Remove from canvas
                    </TextBlue>
                  ) : (
                    <TextBlue onClick={() => addToCanvas(s)} style={{ marginLeft: 10 }}>
                      Add to canvas
                    </TextBlue>
                  )
                ) : null}
              </Row>
            </Column>
          ))}
        </SectionsInnerArea>
        {showModal && <SectionModal onSave={this.onFinishCreateEdit} section={section} onClose={this.onCloseModal} />}
        {showDeleteModal && <DeleteModal onConfirm={this.onDeleteImage} onClose={this.onCloseDeleteModal} />}
      </SectionsWrapper>
    )
  }
}

export default connect(
  ({ images, sections }) => ({ images, sections }),
  dispatch => bindActionCreators(actions, dispatch),
)(Sections)
