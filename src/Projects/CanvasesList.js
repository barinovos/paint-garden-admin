import React from 'react'
import PropTypes from 'prop-types'
import { CanvasesWrapper, CreateCanvas, OtherProjects, MyProjects } from './Styled'
import { SubTitle } from '../Common/Styled'
import CanvasListItem from './CanvasListItem'

const CanvasesList = ({ isModerator, canvases = [], activeProjectId, onCreate, onEdit, onDelete, userId }) => {
  const myProjects = canvases.filter(c => c.user.id === userId)
  const otherProjects = canvases.filter(c => c.user.id !== userId)
  const projectMapper = c => <CanvasListItem key={c.id} canvas={c} onEdit={onEdit} onDelete={onDelete} />

  return (
    <CanvasesWrapper>
      <MyProjects>
        {activeProjectId && isModerator && (
          <CreateCanvas onClick={e => onCreate(e, activeProjectId)}>Create canvas</CreateCanvas>
        )}
        {myProjects.map(projectMapper)}
      </MyProjects>
      {!!otherProjects.length && (
        <OtherProjects>
          {<SubTitle>Not owned by me</SubTitle>}
          {otherProjects.map(projectMapper)}
        </OtherProjects>
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

export default CanvasesList
