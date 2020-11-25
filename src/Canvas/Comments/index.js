import React from 'react'
import { ReactComponent as PinIcon } from '../../assets/dialogue.svg'

import Tooltip from '../../components/Tooltip'

import { Wrapper } from './Styled'

const Comments = () => {
  return (
    <>
      <Wrapper data-tip data-for="dialogue">
        <PinIcon
          style={{
            stroke: 'black',
          }}
        />
      </Wrapper>

      <Tooltip id="dialogue" text="Comments" place="left" />
    </>
  )
}

export default Comments
