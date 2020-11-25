import ReactTooltip from 'react-tooltip'
import React from 'react'

import './index.css'

const Tooltip = ({ id, place = 'top', text }) => {
  return (
    <ReactTooltip
      id={id}
      place={place}
      arrowColor="transparent"
      className={`reacttooltip reacttooltip-${place}`}
      effect="solid"
    >
      <span>{text}</span>
    </ReactTooltip>
  )
}

export default Tooltip
