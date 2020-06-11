import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { ProjectType } from '../types'
import { ProjectsWrapper, ProjectsList, Title, CreateButton } from './Styled'
import ProjectSingle from '../ProjectSingle'
import ProjectModal from '../ProjectModal'
import * as actions from './actions'

const Projects = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [isCreate, setIsCreate] = useState(true);
    const [updateProject, setUpdateProject] = useState(null);
    const { project_id } = useParams();

    useEffect(() => {
        props.fetchData(project_id)
    }, [project_id])

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
            <Title>{project_id === undefined ? 'Projects' : 'Canvases'}</Title>
            <CreateButton onClick={createButtonClicked}>Create {project_id === undefined ?  'project' : 'canvas'}</CreateButton>
            <ProjectsList>
                {props.project.length ? (props.project.map(p => (
                    <ProjectSingle key ={p.id} project={p} onEdit={editButtonClicked} onDelete={onProjectDelete} parentId={project_id}/>
                ))): (
                    <div>No canvases</div>
                )
                }
            </ProjectsList>

        {showModal && <ProjectModal  onSave={onFinishCreateEdit} updateProject={updateProject} onClose={onCloseModal} parentId={project_id} />}
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
