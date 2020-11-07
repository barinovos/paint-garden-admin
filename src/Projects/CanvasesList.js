import React from 'react'
import PropTypes from 'prop-types'
import { CanvasesWrapper, CreateCanvas, OtherProjects, MyProjects } from './Styled'
import { SubTitle } from '../Common/Styled'
import ProjectSingle from '../ProjectSingle'

const CanvasesList = ({ isModerator, projects, activeProjectId, onCreate, onEdit, onDelete }) => {
  const activeProject = (projects || []).find(p => p.id === activeProjectId) || {}
  const childrenProjects = activeProject.canvas || []
  const myProjects = childrenProjects.filter(p => p.is_me)
  const otherProjects = childrenProjects.filter(p => !p.is_me)
  const projectMapper = c => <ProjectSingle key={c.id} project={c} onEdit={onEdit} onDelete={onDelete} />

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
  onCreate: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  projects: PropTypes.array,
}

export default CanvasesList
