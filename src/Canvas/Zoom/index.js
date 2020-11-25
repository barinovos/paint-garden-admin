import React from 'react'

import { Wrapper, Button, Value } from './Styled.js'

const Zoom = ({ onClickPlus, onClickMinus, zoomLevel }) => {
  return (
    <Wrapper>
      <Button onClick={onClickMinus}>-</Button>
      <Button onClick={onClickPlus}>+</Button>
      <Value>{zoomLevel * 10 + '%'}</Value>
    </Wrapper>
  )
}

export default Zoom
