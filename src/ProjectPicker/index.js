import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Wrapper, Logo, CanvasName, OtherWrapper } from './Styled'
import logo from '../assets/logo.svg'
import arrow from '../assets/arrow.svg'
import { Link } from 'react-router-dom'
import Constants from '../constants'

const { ROUTES } = Constants

const ProjectPicker = ({projects, project_id}) => {
    const [showOther, setShowOther] = useState(false);
    let current_project = projects.find(element => element.id === project_id);

    let other_projects = projects.filter( (e) => {
        return e.id !== project_id;
    });

    const arrowClicked = () => {
        setShowOther(!showOther);
    }

    return (
        console.log('Ovde'),
        console.log(projects),
        console.log(project_id),
        <Wrapper>
            <Link to={ROUTES.ROOT} style={{verticalAlign: "middle"}}>
                <Logo src={logo} alt={'Logo'} />
            </Link>
            <CanvasName>
                {current_project && (current_project.title)}
            </CanvasName>
            <img
                alt={'arrow'}
                src={arrow}
                style={{
                    width: "16px",
                    height:"11px",
                    display: "inline-block",
                    verticalAlign: "middle",
                    marginLeft: "20px"
                }}
                onClick={()=> arrowClicked()}
            />
            {showOther &&
                <OtherWrapper>
                    {other_projects.map(op => (
                        <Link
                            key={op.id}
                            to={ROUTES.CANVAS + '/' + op.id}
                            onClick={()=> arrowClicked()}
                            style={{
                                display: "block",
                            }}
                        >
                            {op.title}
                        </Link>
                    ))}
                </OtherWrapper>
            }
        </Wrapper>
    )

}

export default ProjectPicker
