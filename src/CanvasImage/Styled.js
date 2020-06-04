import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
    position: absolute;
    width: ${props => props.width || 200}px;
    height: ${props => props.height || 100}px;
    top: ${props => props.top || 0}px;
    left: ${props => props.left || 0}px;
`