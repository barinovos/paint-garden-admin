import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, CanvasName, Arrow, Link } from './Styled'
import arrow from '../../assets/arrow.svg'
import Constants from '../../constants'

const { ROUTES } = Constants

const ProjectPicker = ({ title }) => {
  return (
    <Wrapper>
      <Link to={ROUTES.ROOT}>
        <Arrow alt={'arrow'} src={arrow} />
        Back
      </Link>
      {title && <CanvasName>{title}</CanvasName>}
    </Wrapper>
  )
}

ProjectPicker.propTypes = {
  title: PropTypes.string,
}

export default ProjectPicker
