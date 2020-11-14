import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { CanvasesWrapper, CreateCanvas, OtherProjects, MyProjects } from './Styled'
import { SubTitle } from '../Common/Styled'
import CanvasListItem from './CanvasListItem'
import CreateEditModal from './CreateEditModal'
import { createCanvas, updateCanvas, deleteCanvas } from './actions'

const CanvasesList = ({
  canvases = [],
  activeProjectId,
  userId,
  isModerator,
  createCanvas,
  updateCanvas,
  deleteCanvas,
}) => {
  const [modal, setModal] = useState({ visible: false })
  const myProjects = canvases.filter(c => c.user.id === userId)
  const otherProjects = canvases.filter(c => c.user.id !== userId)

  const createButtonClicked = () =>
    setModal({
      visible: true,
    })

  const editButtonClicked = canvas =>
    setModal({
      visible: true,
      canvas,
    })

  const onFinishCreateEdit = canvas => {
    modal.canvas
      ? updateCanvas({
          ...modal.canvas,
          ...canvas,
        })
      : createCanvas(canvas, activeProjectId)
    setModal({ visible: false })
  }

  const projectMapper = c => <CanvasListItem key={c.id} canvas={c} onEdit={editButtonClicked} onDelete={deleteCanvas} />

  return (
    <CanvasesWrapper>
      <MyProjects>
        {activeProjectId && isModerator && <CreateCanvas onClick={createButtonClicked}>Create canvas</CreateCanvas>}
        {myProjects.map(projectMapper)}
      </MyProjects>
      {!!otherProjects.length && (
        <OtherProjects>
          {<SubTitle>Not owned by me</SubTitle>}
          {otherProjects.map(projectMapper)}
        </OtherProjects>
      )}
      {modal.visible && (
        <CreateEditModal
          onSave={onFinishCreateEdit}
          onClose={() => setModal({ visible: false })}
          onDelete={deleteCanvas}
          entity={modal.canvas}
        />
      )}
    </CanvasesWrapper>
  )
}

CanvasesList.propTypes = {
  isModerator: PropTypes.bool,
  activeProjectId: PropTypes.string,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onCreate: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  canvases: PropTypes.array,
}

export default connect(
  ({ canvases, activeProject, user }) => ({
    canvases,
    activeProjectId: activeProject.id,
    userId: user.id,
    isModerator: user.isModerator(),
  }),
  dispatch => bindActionCreators({ createCanvas, updateCanvas, deleteCanvas }, dispatch),
)(CanvasesList)
