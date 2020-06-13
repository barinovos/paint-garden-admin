import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { ProjectType } from '../types'
import edit from '../assets/edit.svg'
import trash from '../assets/trash_.svg'
import { ProjectsWrapper, ProjectsList, Title, CreateButton, ProjectSidebar, CanvasArea, ProjectListing, CreateCanvas, ProjectTitle, ProjectsTopBar, InviteButton, ProjectBarRight } from './Styled'
import ProjectSingle from '../ProjectSingle'
import ProjectModal from '../ProjectModal'
import { Icon } from '../Common/Styled'
import * as actions from './actions'

const Projects = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [isCreate, setIsCreate] = useState(true);
    const [updateProject, setUpdateProject] = useState(null);
    const [project_id, setProjectId ] = useState(null);
    const [active_project, setActiveProject] = useState({});

    useEffect(() => {
        props.fetchData()
    }, [])

  const createButtonClicked = (event, parent_id = null) => {
    console.log('CREATE BUTTON CLICKED')
    console.log(parent_id)
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
    updateActiveProject()
  }

  const onFinishCreateEdit = project => {
    setShowModal(false)
    isCreate ? props.createProject(project) : props.updateProject(project)
    updateActiveProject()
  }

  const changeActiveProject = p => {
    setActiveProject(p);
  }

  const updateActiveProject = () => {
    let new_active_project = props.project.filter(p => p.id === active_project.id );
    setActiveProject(new_active_project.length > 0 ? new_active_project[0] : {});
  }

    return (
        <ProjectsWrapper>
            <ProjectSidebar>
              <Title>My Projects</Title>
              <CreateButton onClick={createButtonClicked}>Add</CreateButton>
              {props.project.length ? (props.project
                    .filter(p => p.parent_id === null)
                    .map(p => (
                    //<ProjectSingle key ={p.id} project={p} onEdit={editButtonClicked} onDelete={onProjectDelete} parentId={project_id}/>
                    <ProjectListing active = {p.id === (active_project ? active_project.id : null)} onClick={() => changeActiveProject(p)}>
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
              {active_project.title && (
                <ProjectsTopBar>
                  <ProjectTitle>{active_project.title}</ProjectTitle>
                  <ProjectBarRight>
                    <InviteButton>Invite</InviteButton>
                    <Icon style={{display: 'inline-block', marginLeft: '10px'}} src={trash} onClick={() => onProjectDelete(active_project.id)} />
                  </ProjectBarRight>
                </ProjectsTopBar>
              )}
              {active_project.id && (<CreateCanvas onClick={() => createButtonClicked(active_project.id)} >Create canvas</CreateCanvas>)}
                {props.project.length && props.project
                .filter(p => p.id === active_project.id)
                .map(p => (
                    p.children.map ( c =>
                      <ProjectSingle key ={c.id} project={c} onEdit={editButtonClicked} onDelete={onProjectDelete} parentId={active_project.id}/>
                    )
                ))
                }
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
  ({ project, canvases }) => ({ project, canvases }),
  dispatch => bindActionCreators({ ...actions }, dispatch),
)(Projects)
