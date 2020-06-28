import React from 'react'
import PropTypes from 'prop-types'
import { CreateButton, ProjectListing, ProjectSidebar, ProjectSidebarControls, Title } from './Styled'
import { Icon } from '../Common/Styled'
import edit from '../assets/edit.svg'

const getParentProjects = (projects = []) => {
  const parentsDict = projects.reduce((obj, p) => {
    obj[p.parent_id] = {
      id: p.parent_id,
      title: p.parent_title || 'No title',
    }
    return obj
  }, {})
  return Object.values(parentsDict)
}

const LeftPanel = ({ isModerator, onCreate, onChangeActiveProject, onEdit, activeProjectId, projects }) => (
  <ProjectSidebar>
    <ProjectSidebarControls>
      <Title>My Projects</Title>
      {isModerator && <CreateButton onClick={onCreate}>Add</CreateButton>}
    </ProjectSidebarControls>
    {isModerator
      ? (projects || [])
          .filter(p => p.parent_id === null)
          .map((p, i) => (
            <ProjectListing key={i} active={p.id === activeProjectId} onClick={() => onChangeActiveProject(p)}>
              {p.title}
              {p.id === activeProjectId && <Icon src={edit} onClick={() => onEdit(p)} />}
            </ProjectListing>
          ))
      : getParentProjects(projects).map((p, i) => (
          <ProjectListing key={i} active={p.id === activeProjectId} onClick={() => onChangeActiveProject(p)}>
            {p.title}
          </ProjectListing>
        ))}
    {!projects.length && <div style={{ padding: 15 }}>No projects</div>}
  </ProjectSidebar>
)

LeftPanel.propTypes = {
  isModerator: PropTypes.bool.isRequired,
  activeProjectId: PropTypes.string,
  onCreate: PropTypes.func,
  onChangeActiveProject: PropTypes.func,
  onEdit: PropTypes.func,
  projects: PropTypes.array,
}

export default LeftPanel
