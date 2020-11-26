import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ProjectType } from '../types'
import { CanvasArea, ProjectTitle, ProjectsTopBar, ProjectBarRight } from './Styled'
import CreateEditModal from './CreateEditModal'
import ProjectInviteModal from './ProjectInviteModal'
import ProjectsList from './ProjectsList'
import * as actions from './actions'
import CanvasesList from './CanvasesList'
import Button from '../components/Button'

const Projects = ({
  fetchData,
  projects,
  activeProject,
  user,
  deleteProject,
  createProject,
  sendInvites,
  setActiveProject,
  updateProject,
}) => {
  const [modal, setModal] = useState({ visible: false })
  const [showModalInvite, setShowModalInvite] = useState(false)

  useEffect(() => {
    fetchData()
  }, []) // eslint-disable-line
  const isModerator = user && user.isModerator()

  const createButtonClicked = () =>
    setModal({
      visible: true,
    })

  const editButtonClicked = project =>
    setModal({
      visible: true,
      project,
    })

  const onFinishCreateEdit = project => {
    modal.project
      ? updateProject({
          ...modal.project,
          ...project,
        })
      : createProject(project)
    setModal({ visible: false })
  }

  return (
    <Fragment>
      <ProjectsList
        isModerator={isModerator}
        activeProjectId={activeProject.id}
        onChangeActiveProject={setActiveProject}
        onCreate={createButtonClicked}
        onEdit={editButtonClicked}
        projects={projects}
      />
      <CanvasArea>
        {activeProject.title && (
          <ProjectsTopBar>
            <ProjectTitle>{activeProject.title}</ProjectTitle>
            {isModerator && (
              <ProjectBarRight>
                <Button onClick={() => setShowModalInvite(true)}>Invite</Button>
              </ProjectBarRight>
            )}
          </ProjectsTopBar>
        )}
        <CanvasesList />
      </CanvasArea>
      {modal.visible && (
        <CreateEditModal
          onSave={onFinishCreateEdit}
          onClose={() => setModal({ visible: false })}
          onDelete={deleteProject}
          entity={modal.project}
        />
      )}
      {showModalInvite && (
        <ProjectInviteModal
          onSave={sendInvites}
          onClose={() => setShowModalInvite(false)}
          projectId={activeProject.id}
        />
      )}
    </Fragment>
  )
}

Projects.propTypes = {
  projects: PropTypes.arrayOf(ProjectType),
  user: PropTypes.object,
  setActiveProject: PropTypes.func,
}

export default connect(
  ({ projects, user, activeProject }) => ({ projects, user, activeProject }),
  dispatch => bindActionCreators({ ...actions }, dispatch),
)(Projects)
