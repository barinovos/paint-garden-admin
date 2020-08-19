import React, { useState } from 'react'
import PropTypes from 'prop-types'
import flatten from 'lodash/flatten'
import { Wrapper, Logo, CanvasName, OtherWrapper, Arrow, ProjectLink } from './Styled'
import logo from '../assets/logo.svg'
import arrow from '../assets/arrow.svg'
import { Link } from 'react-router-dom'
import Constants from '../constants'

const { ROUTES } = Constants

const ProjectPicker = ({ projects, projectId }) => {
  const [showOther, setShowOther] = useState(false)
  const currentProject = flatten(projects.map(p => p.children)).find(p => p.id === projectId)
  if (!currentProject) {
    return null
  }
  const parentId = currentProject ? currentProject.parent_id : ''
  const parentProjects = projects.find(element => element.id === parentId).children

  const arrowClicked = () => {
    setShowOther(!showOther)
  }

  return (
    <Wrapper>
      <Link to={ROUTES.ROOT} style={{ verticalAlign: 'middle' }}>
        <Logo src={logo} alt={'Logo'} />
      </Link>
      <CanvasName>{currentProject && currentProject.title}</CanvasName>
      <Arrow alt={'arrow'} src={arrow} onClick={arrowClicked} />
      {showOther && (
        <OtherWrapper>
          {parentProjects.map(op => (
            <Link key={op.id} to={ROUTES.CANVAS + '/' + op.id} onClick={arrowClicked}>
              <ProjectLink>{op.title}</ProjectLink>
            </Link>
          ))}
        </OtherWrapper>
      )}
    </Wrapper>
  )
}

ProjectPicker.propTypes = {
  projects: PropTypes.array,
  projectId: PropTypes.string,
}

export default ProjectPicker
