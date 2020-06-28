import React from 'react'
import PropTypes from 'prop-types'
import { ProjectType } from '../types'
import { Link } from 'react-router-dom'
import edit from '../assets/edit.svg'
import trash from '../assets/trash.svg'
import { Icon } from '../Common/Styled'
import { Wrapper, Title, ImageWrapper, Overlay, Icons, InfoOverlay } from './Styled'

const ProjectSingle = ({ project, onEdit, onDelete, viewMode }) => {
  return (
    <Wrapper>
      <Link to={`${'/canvas/'}${project.id}`}>
        <ImageWrapper>
          <img alt="default_image" src={project.image ? project.image : 'default.jpeg'} width="100%" height="100%" />
          <Overlay />
          {!viewMode && (
            <Icons>
              <Icon src={edit} onClick={() => onEdit(project)} />
              <Icon src={trash} onClick={() => onDelete(project.id)} />
            </Icons>
          )}
        </ImageWrapper>
        <InfoOverlay>
          <Link to={`${'/canvas/'}${project.id}`}>
            <Title>{project.title}</Title>
          </Link>
        </InfoOverlay>
      </Link>
    </Wrapper>
  )
}

ProjectSingle.propTypes = {
  project: ProjectType,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  viewMode: PropTypes.bool,
}

export default ProjectSingle
