import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {ProjectType} from '../types'
import {Wrapper, Title, DateWrapper} from './Styled'


const Projects = ({project}) => {
    return (
        <Wrapper>
            <img alt = "default_image" src = "logo.svg" width="100px"/>
            <Title>{project.title}</Title>
            <DateWrapper>{new Date(project.createdAt).toLocaleString("en-GB", {day: 'numeric', month: 'long', year: 'numeric' })}</DateWrapper>
        </Wrapper>
    )
}


Projects.propTypes = {
    projects: ProjectType,
}

export default Projects
