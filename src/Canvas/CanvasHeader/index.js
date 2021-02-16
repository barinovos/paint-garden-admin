import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Wrapper, CanvasName, Arrow, Link } from './Styled'
import arrow from '../../assets/arrow.svg'
import Constants from '../../constants'

const { ROUTES } = Constants

const CanvasHeader = ({ title, stateData }) => {
  return (
    <Wrapper>
      <Link
        to={ROUTES.ROOT}
        onClick={() => {
          sessionStorage.setItem('activeProject', stateData.activeProject.id)
        }}
      >
        <Arrow alt={'arrow'} src={arrow} />
        Back
      </Link>
      {title && <CanvasName>{title}</CanvasName>}
    </Wrapper>
  )
}

CanvasHeader.propTypes = {
  title: PropTypes.string,
  stateData: PropTypes.object,
}

const mapStateToProps = state => ({
  stateData: state,
})

export default connect(mapStateToProps)(CanvasHeader)
