import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { calcSizeWithZoom, reCalcSizeWithZoom, canvasTopOffset, canvasLeftOffset } from '../utils/calcZoom'
import { WebViewWrapper, Area } from './Styled'
import { Button } from '../Common/Styled'

const WevView = ({ data, zoomLevel, onChange }) => {
  const [state, updateState] = useState({
    x: data.x,
    y: data.y,
    width: data.width,
    height: data.height,
    isMove: false,
    downX: null,
    downY: null,
    isUntouched: true,
  })
  const [originalData] = useState(data)

  const { x, y, width, height, isMove, downX, downY, isUntouched } = state

  const reCalc = (x1, y1, x2, y2) => {
    const x3 = Math.min(x1, x2)
    const x4 = Math.max(x1, x2)
    const y3 = Math.min(y1, y2)
    const y4 = Math.max(y1, y2)
    return { x: x3, y: y3, width: x4 - x3, height: y4 - y3 }
  }

  const onMouseDown = e => {
    const fixedClickX = e.clientX - canvasLeftOffset
    const fixedClickY = e.clientY - canvasTopOffset
    updateState({
      ...state,
      isMove: true,
      isUntouched: false,
      x: fixedClickX,
      downX: fixedClickX,
      downY: fixedClickY,
      y: fixedClickY,
      width: 1,
      height: 1,
    })
  }

  const onMouseMove = e => {
    if (isMove) {
      const fixedClickX = e.clientX - canvasLeftOffset
      const fixedClickY = e.clientY - canvasTopOffset
      updateState({ isMove, downX, downY, ...reCalc(downX, downY, fixedClickX, fixedClickY) })
    }
  }

  const onMouseUp = () => {
    if (isMove) {
      updateState({ ...state, isMove: false, downX: null, downY: null })
      onChange({
        x: reCalcSizeWithZoom(x, zoomLevel),
        y: reCalcSizeWithZoom(y, zoomLevel),
        width: reCalcSizeWithZoom(width, zoomLevel),
        height: reCalcSizeWithZoom(height, zoomLevel),
      })
    }
  }

  return (
    <WebViewWrapper onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
      <Area
        top={isUntouched ? calcSizeWithZoom(y, zoomLevel) : y}
        left={isUntouched ? calcSizeWithZoom(x, zoomLevel) : x}
        width={isUntouched ? calcSizeWithZoom(width, zoomLevel) : width}
        height={isUntouched ? calcSizeWithZoom(height, zoomLevel) : height}
      />
      {!isUntouched && <Button onClick={() => onChange(originalData)}>Undo</Button>}
    </WebViewWrapper>
  )
}

WevView.propTypes = {
  data: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  zoomLevel: PropTypes.number,
}

export default WevView
