import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import {ProjectType} from '../types'
import {ProjectsWrapper, ProjectsList, Title, CreateButton} from './Styled'
import ProjectSingle from '../ProjectSingle'
import ProjectModal from '../ProjectModal'
import * as actions from './actions'

const Projects = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [isCreate, setIsCreate] = useState(true);
    const [updateProject, setUpdateProject] = useState(null);

    useEffect(() => {
        props.fetchData()
    }, [])

    const createButtonClicked = () => {
        setShowModal(true)
        setIsCreate(true)
        setUpdateProject(null)
    }

   const onCloseModal = () => {
        setShowModal(false)
   }

  const onFinishCreateEdit = project => {
    console.log('onFinishCreateEdit')
      console.log(project)
    setShowModal(false)
    isCreate ? props.createProject(project) : props.updateProject(project)
  }


    return (
        <ProjectsWrapper>
            <Title>Projects</Title>
            <CreateButton onClick={createButtonClicked}>Create project</CreateButton>
            <ProjectsList>
                {props.project.map(p => (
                    <ProjectSingle key ={p.id} project={p} />
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
    dispatch => bindActionCreators({...actions}, dispatch),
  )(Projects)