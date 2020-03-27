import PropTypes from 'prop-types'

export const ProjectType = PropTypes.shape({
  id: PropTypes.string.isRequired,
})

export const ImageType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  filePath: PropTypes.string.isRequired
})

export const CanvasType = PropTypes.shape({
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  dimension: PropTypes.number
})

export const SectionType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  length: PropTypes.number,
  depth: PropTypes.number,
  medium: PropTypes.string,
  synopisis: PropTypes.string,
  year: PropTypes.number,
  imageIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  dimension: PropTypes.number
})
