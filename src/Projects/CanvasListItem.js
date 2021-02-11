import React from 'react'
import PropTypes from 'prop-types'
import { ProjectType } from '../types'
import { Link } from 'react-router-dom'
import edit from '../assets/edit.svg'
import trash from '../assets/trash.svg'
import { Icon } from '../Common/Styled'
import { Wrapper, CanvasesTitle, UserName, ImageWrapper, Overlay, Icons, InfoOverlay } from './Styled'
import Constants from '../constants'

const CanvasListItem = ({ canvas, onEdit, onDelete, viewMode }) => {
  return (
    <Wrapper style={{ backgroundColor: canvas?.bg_color }}>
      <Link
        to={`${Constants.ROUTES.CANVAS}/${canvas.id}`}
        style={{
          height: '100%',
          display: 'block',
        }}
      >
        <ImageWrapper>
          {!canvas?.bg_color && (
            <img alt="default_image" src={canvas.image ? canvas.image : 'default.png'} width="100%" height="100%" />
          )}
          <Overlay />
          {!viewMode && (
            <Icons>
              <Icon
                src={edit}
                onClick={ev => {
                  onEdit(canvas)
                  ev.stopPropagation()
                  ev.preventDefault()
                }}
              />
              <Icon
                src={trash}
                onClick={ev => {
                  onDelete(canvas.id)
                  ev.stopPropagation()
                  ev.preventDefault()
                }}
              />
            </Icons>
          )}
        </ImageWrapper>
        <InfoOverlay>
          <CanvasesTitle>{canvas.title}</CanvasesTitle>
          <UserName>By: {canvas.user.name}</UserName>
        </InfoOverlay>
      </Link>
    </Wrapper>
  )
}

CanvasListItem.propTypes = {
  canvas: ProjectType,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  viewMode: PropTypes.bool,
}

export default CanvasListItem
