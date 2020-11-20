import React from 'react'
import PropTypes from 'prop-types'
import flatten from 'lodash/flatten'
import { Wrapper, CanvasName, Arrow, Link } from './Styled'
import arrow from '../../assets/arrow.svg'
import Constants from '../../constants'

const { ROUTES } = Constants

const ProjectPicker = ({ projects, projectId }) => {
  const currentProject = flatten(projects.map(p => p.canvas)).find(p => p.id === projectId)
  if (!currentProject) {
    return null
  }

  return (
    <Wrapper>
      <Link to={ROUTES.ROOT}>
        <Arrow alt={'arrow'} src={arrow} />
        Back
      </Link>
      <CanvasName>{currentProject && currentProject.title}</CanvasName>
    </Wrapper>
  )
}

ProjectPicker.propTypes = {
  projects: PropTypes.array,
  projectId: PropTypes.string,
}

export default ProjectPicker
