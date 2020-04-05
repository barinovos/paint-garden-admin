import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {ProjectType} from '../types'
import edit from '../assets/edit.svg'
import trash from '../assets/trash.svg'
import { Icon } from '../Common/Styled'
import {Wrapper, Title, DateWrapper, ImageWrapper, Overlay, Icons} from './Styled'


const Projects = ({project, onEdit, onDelete}) => {
    return (
        <Wrapper>
            <ImageWrapper>
                <img alt = "default_image" src ={project.image ? project.image : "default.jpeg"} width="208px" height="208px"/>
                <Overlay/>
                <Icons>
                    <Icon src={edit} onClick = {() => onEdit(project)} />
                    <Icon src={trash} onClick= {() => onDelete(project.id)} />
                </Icons>
            </ImageWrapper>
            <Title>{project.title}</Title>
            <DateWrapper>{new Date(project.createdAt).toLocaleString("en-GB", {day: 'numeric', month: 'long', year: 'numeric' })}</DateWrapper>
        </Wrapper>
    )
}


Projects.propTypes = {
    project: ProjectType,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
}

export default Projects
