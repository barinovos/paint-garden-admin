import React from 'react'
import { ReactComponent as PinIcon } from '../../assets/dialogue.svg'

import Tooltip from '../Tooltip'

import { Wrapper } from './Styled'

const Dialogue = () => {
  return (
    <>
      <Wrapper data-tip data-for="dialogue">
        <PinIcon
          style={{
            stroke: 'black',
          }}
        />
      </Wrapper>

      <Tooltip id="dialogue" text="Dialogue" place="left" />
    </>
  )
}

export default Dialogue
