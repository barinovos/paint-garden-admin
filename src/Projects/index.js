import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { ProjectType } from '../types'
import edit from '../assets/edit.svg'
import { ProjectsWrapper, ProjectsList, Title, CreateButton, ProjectSidebar, CanvasArea, ProjectListing, CreateCanvas } from './Styled'
import ProjectSingle from '../ProjectSingle'
import ProjectModal from '../ProjectModal'
import { Icon } from '../Common/Styled'
import * as actions from './actions'

const Projects = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [isCreate, setIsCreate] = useState(true);
    const [updateProject, setUpdateProject] = useState(null);
    const [ project_id, setProjectId ] = useState(null);
    const [active_project, setActiveProject] = useState({});

    useEffect(() => {
        props.fetchData()
    }, [])

  const createButtonClicked = (parent_id) => {
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

  const onProjectDelete = project_id => {
    props.deleteProject(project_id)
  }

  const onFinishCreateEdit = project => {
    setShowModal(false)
    isCreate ? props.createProject(project) : props.updateProject(project)
  }

  const changeActiveProject = p => {
    setActiveProject(p);
    props.fetchCanvases(p.id);
  }

    return (
        <ProjectsWrapper>
            <ProjectSidebar>
              <Title>My Projects</Title>
              <CreateButton onClick={createButtonClicked}>Add</CreateButton>
              {props.project.length ? (props.project.map(p => (
                    //<ProjectSingle key ={p.id} project={p} onEdit={editButtonClicked} onDelete={onProjectDelete} parentId={project_id}/>
                    <ProjectListing active = {p.id === active_project.id} onClick={() => changeActiveProject(p)}>
                      {p.title}
                      {p.id === active_project.id && (
                      <Icon style={{verticalAlign: 'middle'}} src={edit} onClick = {() => editButtonClicked(p)} />
                      )}
                    </ProjectListing>
                ))): (
                    <div>No projects</div>
                )
              }
            </ProjectSidebar>
            <CanvasArea>
            <ProjectsList>
              {active_project && (
                <div>{active_project.title}</div>)}
              {active_project.id && <CreateCanvas onClick={() => createButtonClicked(active_project.id)} >Create canvas</CreateCanvas>}
                {props.canvases && (props.canvases.map(c => (
                    <ProjectSingle key ={c.id} project={c} onEdit={editButtonClicked} onDelete={onProjectDelete} parentId={active_project}/>
                )))}
            </ProjectsList>
            </CanvasArea>

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
