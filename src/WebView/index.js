import React from 'react'
import PropTypes from 'prop-types'
import { calcSizeWithZoom } from '../utils/calcZoom'
import { WebViewWrapper, Area } from './Styled'

const WevView = ({ data, zoomLevel, onChange }) => {
  const { x, y, width, height } = data
  const calcX = calcSizeWithZoom(x, zoomLevel)
  const calcY = calcSizeWithZoom(y, zoomLevel)
  const calcWidth = calcSizeWithZoom(width, zoomLevel)
  const calcHeight = calcSizeWithZoom(height, zoomLevel)

  let x1 = 0,
    y1 = 0,
    x2 = 0,
    y2 = 0,
    isMove = false
  function reCalc() {
    /*var x3 = Math.min(x1,x2);
    var x4 = Math.max(x1,x2);
    var y3 = Math.min(y1,y2);
    var y4 = Math.max(y1,y2);
    div.style.left = x3 + 'px';
    div.style.top = y3 + 'px';
    div.style.width = x4 - x3 + 'px';
    div.style.height = y4 - y3 + 'px';*/
  }
  const onMouseDown = e => {
    x1 = e.clientX
    y1 = e.clientY
    console.log('down:')
    console.log(e.clientX)
    console.log(e.clientY)
    isMove = true
    reCalc()
  }
  const onMouseMove = e => {
    x2 = e.clientX
    y2 = e.clientY
    reCalc()
  }
  const onMouseUp = e => {
    console.log('up:')
    console.log(e.clientX)
    console.log(e.clientY)
    isMove = false
  }

  return (
    <WebViewWrapper onClick={() => false && onChange('hello')}>
      <Area
        top={calcY}
        left={calcX}
        width={calcWidth}
        height={calcHeight}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      />
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
