import React from 'react'
import PropTypes from 'prop-types'
import { CanvasesWrapper, CreateCanvas } from './Styled'
import ProjectSingle from '../ProjectSingle'

const CanvasesList = ({ isModerator, projects, activeProjectId, onCreate, onEdit, onDelete }) => (
  <CanvasesWrapper>
    {activeProjectId && isModerator && (
      <CreateCanvas onClick={e => onCreate(e, activeProjectId)}>Create canvas</CreateCanvas>
    )}
    {isModerator
      ? (projects || [])
          .filter(p => p.id === activeProjectId)
          .map(p => p.children.map(c => <ProjectSingle key={c.id} project={c} onEdit={onEdit} onDelete={onDelete} />))
      : projects
          .filter(p => p.parent_id === activeProjectId)
          .map(p => <ProjectSingle key={p.id} project={p} viewMode={true} />)}
  </CanvasesWrapper>
)

CanvasesList.propTypes = {
  isModerator: PropTypes.bool.isRequired,
  activeProjectId: PropTypes.string,
  onCreate: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  projects: PropTypes.array,
}

export default CanvasesList
