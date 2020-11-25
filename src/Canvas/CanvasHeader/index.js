import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, CanvasName, Arrow, Link } from './Styled'
import arrow from '../../assets/arrow.svg'
import Constants from '../../constants'

const { ROUTES } = Constants

const CanvasHeader = ({ title }) => {
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

CanvasHeader.propTypes = {
  title: PropTypes.string,
}

export default CanvasHeader
