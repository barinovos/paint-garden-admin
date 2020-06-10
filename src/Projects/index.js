import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ProjectType } from '../types'
import { ProjectsWrapper, ProjectsList, Title, CreateButton } from './Styled'
import ProjectSingle from '../ProjectSingle'
import ProjectModal from '../ProjectModal'
import * as actions from './actions'

const Projects = props => {
  const [showModal, setShowModal] = useState(false)
  const [isCreate, setIsCreate] = useState(true)
  const [updateProject, setUpdateProject] = useState(null)

  useEffect(() => {
    props.fetchData()
    // eslint-disable-next-line
  }, [])

  const createButtonClicked = () => {
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

  const onProjectDelete = project_id => {
    props.deleteProject(project_id)
  }

  const onFinishCreateEdit = project => {
    setShowModal(false)
    isCreate ? props.createProject(project) : props.updateProject(project)
  }

  return (
    <ProjectsWrapper>
      <Title>Projects</Title>
      <CreateButton onClick={createButtonClicked}>Create project</CreateButton>
      <ProjectsList>
        {props.project.map(p => (
          <ProjectSingle key={p.id} project={p} onEdit={editButtonClicked} onDelete={onProjectDelete} />
        ))}
      </ProjectsList>

      {showModal && <ProjectModal onSave={onFinishCreateEdit} updateProject={updateProject} onClose={onCloseModal} />}
    </ProjectsWrapper>
  )
}

Projects.propTypes = {
  projects: PropTypes.arrayOf(ProjectType),
}

export default connect(
  ({ project }) => ({ project }),
  dispatch => bindActionCreators({ ...actions }, dispatch),
)(Projects)
