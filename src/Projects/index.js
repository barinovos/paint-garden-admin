import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ProjectType } from '../types'
import edit from '../assets/edit.svg'
import {
  ProjectsWrapper,
  ProjectsList,
  Title,
  CreateButton,
  ProjectSidebar,
  CanvasArea,
  ProjectListing,
  CreateCanvas,
  ProjectTitle,
  ProjectsTopBar,
  InviteButton,
  ProjectBarRight,
  CanvasesWrapper,
  ProjectSidebarControls,
} from './Styled'
import ProjectSingle from '../ProjectSingle'
import ProjectModal from '../ProjectModal'
import ProjectInviteModal from '../ProjectInviteModal'
import { Icon } from '../Common/Styled'
import * as actions from './actions'

const Projects = props => {
  const [showModal, setShowModal] = useState(false)
  const [showModalInvite, setShowModalInvite] = useState(false)
  const [isCreate, setIsCreate] = useState(true)
  const [updateProject, setUpdateProject] = useState(null)
  const [project_id, setProjectId] = useState(null)
  const [active_project, setActiveProject] = useState({})

  useEffect(() => {
    props.fetchData()
  }, []) // eslint-disable-line

  // set default active project after data fetched
  if (!active_project.id && props.project.length) {
    setActiveProject(props.project.filter(p => p.parent_id === null)[0])
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

  const onCloseModal = () => {
    setShowModal(false)
  }

  const onCloseModalInvite = () => {
    setShowModalInvite(false)
  }

  const onProjectDelete = project_id => {
    props.deleteProject(project_id)
    updateActiveProject()
  }

  const onFinishCreateEdit = project => {
    setShowModal(false)
    isCreate ? props.createProject(project) : props.updateProject(project)
    updateActiveProject()
  }

  const onInvite = project => props.sendInvites(project)

  const changeActiveProject = p => {
    setActiveProject(p)
  }

  const updateActiveProject = () => {
    let new_active_project = props.project.filter(p => p.id === active_project.id)
    setActiveProject(new_active_project.length > 0 ? new_active_project[0] : {})
  }

  const inviteButtonClicked = () => {
    setShowModalInvite(true)
  }

  return (
    <ProjectsWrapper>
      <ProjectSidebar>
        <ProjectSidebarControls>
          <Title>My Projects</Title>
          <CreateButton onClick={createButtonClicked}>Add</CreateButton>
        </ProjectSidebarControls>
        {props.project.length ? (
          props.project
            .filter(p => p.parent_id === null)
            .map((p, i) => (
              <ProjectListing key={i} active={p.id === active_project.id} onClick={() => changeActiveProject(p)}>
                {p.title}
                {p.id === active_project.id && (
                  <Icon style={{ verticalAlign: 'middle' }} src={edit} onClick={() => editButtonClicked(p)} />
                )}
              </ProjectListing>
            ))
        ) : (
          <div>No projects</div>
        )}
      </ProjectSidebar>
      <CanvasArea>
        <ProjectsList>
          {active_project.title && (
            <ProjectsTopBar>
              <ProjectTitle>{active_project.title}</ProjectTitle>
              <ProjectBarRight>
                <InviteButton onClick={inviteButtonClicked}>Invite</InviteButton>
              </ProjectBarRight>
            </ProjectsTopBar>
          )}
          <CanvasesWrapper>
            {active_project.id && (
              <CreateCanvas onClick={e => createButtonClicked(e, active_project.id)}>Create canvas</CreateCanvas>
            )}
            {props.project.length &&
              props.project
                .filter(p => p.id === active_project.id)
                .map(p =>
                  p.children.map(c => (
                    <ProjectSingle
                      key={c.id}
                      project={c}
                      onEdit={editButtonClicked}
                      onDelete={onProjectDelete}
                      parentId={active_project.id}
                    />
                  )),
                )}
          </CanvasesWrapper>
        </ProjectsList>
      </CanvasArea>

      {showModal && (
        <ProjectModal
          onSave={onFinishCreateEdit}
          updateProject={updateProject}
          onClose={onCloseModal}
          parentId={project_id}
          onDelete={onProjectDelete}
        />
      )}
      {showModalInvite && (
        <ProjectInviteModal
          onSave={onInvite}
          updateProject={updateProject}
          onClose={onCloseModalInvite}
          projectId={active_project.id}
        />
      )}
    </ProjectsWrapper>
  )
}

Projects.propTypes = {
  projects: PropTypes.arrayOf(ProjectType),
}

export default connect(
  ({ project, canvases }) => ({ project, canvases }),
  dispatch => bindActionCreators({ ...actions }, dispatch),
)(Projects)
