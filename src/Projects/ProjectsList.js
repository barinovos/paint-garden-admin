import React from 'react'
import PropTypes from 'prop-types'
import { CreateButton, ProjectListing, ProjectSidebar, ProjectSidebarControls, Title } from './Styled'
import { Icon } from '../Common/Styled'
import edit from '../assets/edit.svg'

const ProjectsList = ({ isModerator, onCreate, onChangeActiveProject, onEdit, activeProjectId, projects }) => (
  <ProjectSidebar>
    <ProjectSidebarControls>
      <Title>My Projects</Title>
      {isModerator && <CreateButton onClick={onCreate}>Add</CreateButton>}
    </ProjectSidebarControls>
    {projects.map((p, i) => (
      <ProjectListing key={i} active={p.id === activeProjectId} onClick={() => onChangeActiveProject(p)}>
        {p.title}
        {p.id === activeProjectId && <Icon src={edit} onClick={() => onEdit(p)} />}
      </ProjectListing>
    ))}
    {!projects.length && <div style={{ padding: 15 }}>No projects</div>}
  </ProjectSidebar>
)

ProjectsList.defaultProps = {
  projects: [],
}

ProjectsList.propTypes = {
  isModerator: PropTypes.bool,
  activeProjectId: PropTypes.string,
  onCreate: PropTypes.func,
  onChangeActiveProject: PropTypes.func,
  onEdit: PropTypes.func,
  projects: PropTypes.array,
}

export default ProjectsList
