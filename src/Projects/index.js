import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ProjectType } from '../types'
import { CanvasArea, ProjectTitle, ProjectsTopBar, InviteButton, ProjectBarRight } from './Styled'
import ProjectModal from '../ProjectModal'
import ProjectInviteModal from '../ProjectInviteModal'
import ProjectsList from './ProjectsList'
import * as actions from './actions'
import CanvasesList from './CanvasesList'

const Projects = ({ fetchData, project, user, deleteProject, createProject, sendInvites, ...props }) => {
  const [showModal, setShowModal] = useState(false)
  const [showModalInvite, setShowModalInvite] = useState(false)
  const [isCreate, setIsCreate] = useState(true)
  const [updateProject, setUpdateProject] = useState(null)
  const [projectId, setProjectId] = useState(null)
  const [activeProject, setActiveProject] = useState({})

  useEffect(() => {
    fetchData()
  }, []) // eslint-disable-line
  const isModerator = user && user.isModerator()

  // set default active project after data fetched
  if (project.length) {
    // the use case for teacher account
    const firstProject = project[0]
    if (firstProject && !activeProject.id) setActiveProject(firstProject)
  }

  const createButtonClicked = (e, parent_id) => {
    setProjectId(parent_id)
    setShowModal(true)
    setIsCreate(true)
    setUpdateProject(null)
  }

  const editButtonClicked = project => {
    setShowModal(true)
    setIsCreate(false)
    setUpdateProject(project)
  }

  const onProjectDelete = projectId => {
    deleteProject(projectId)
    updateActiveProject()
  }

  const onFinishCreateEdit = project => {
    setShowModal(false)
    isCreate ? createProject(project) : props.updateProject(project)
    updateActiveProject()
  }

  const updateActiveProject = () => {
    let new_active_project = project.filter(p => p.id === activeProject.id)
    setActiveProject(new_active_project.length > 0 ? new_active_project[0] : {})
  }

  return (
    <Fragment>
      <ProjectsList
        isModerator={isModerator}
        activeProjectId={activeProject.id}
        onChangeActiveProject={setActiveProject}
        onCreate={createButtonClicked}
        onEdit={editButtonClicked}
        projects={project}
      />
      <CanvasArea>
        {activeProject.title && (
          <ProjectsTopBar>
            <ProjectTitle>{activeProject.title}</ProjectTitle>
            {isModerator && (
              <ProjectBarRight>
                <InviteButton onClick={() => setShowModalInvite(true)}>Invite</InviteButton>
              </ProjectBarRight>
            )}
          </ProjectsTopBar>
        )}
        <CanvasesList
          isModerator={isModerator}
          canvases={activeProject ? activeProject.canvas : []}
          onEdit={editButtonClicked}
          onCreate={createButtonClicked}
          activeProjectId={activeProject.id}
          userId={user.id}
          onDelete={onProjectDelete}
        />
      </CanvasArea>

      {showModal && (
        <ProjectModal
          onSave={onFinishCreateEdit}
          updateProject={updateProject}
          onClose={() => setShowModal(false)}
          parentId={projectId}
          onDelete={onProjectDelete}
        />
      )}
      {showModalInvite && (
        <ProjectInviteModal
          onSave={sendInvites}
          updateProject={updateProject}
          onClose={() => setShowModalInvite(false)}
          projectId={activeProject.id}
        />
      )}
    </Fragment>
  )
}

Projects.propTypes = {
  project: PropTypes.arrayOf(ProjectType),
  user: PropTypes.object,
}

export default connect(
  ({ project, user }) => ({ project, user }),
  dispatch => bindActionCreators({ ...actions }, dispatch),
)(Projects)
