import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Wrapper, ContentWrapper } from './Styled'
import { Button, Title, ItemInput, ItemTextArea, JustifiedRow, RightAlignedRow } from '../Common/Styled'

const ProjectModal = ({onSave, updateProject, onClose}) => {
    const [title, setTitle] = useState(updateProject !== null ? updateProject.title : "");
    const [errors, setError] = useState([]);
    const minTitleLength = 6;
    const handleSubmit = () => {
        if (title.length > minTitleLength) {
            onSave({title:title});
        }
    }

    const handleChange = ev => {
        const title = ev.target.value;
        let errors  = {};
        if (title.length < minTitleLength) {
            errors.title = `Title has to be longer than ${minTitleLength}`;
        }
        setTitle(ev.target.value)
    }

    return (
        <Wrapper onClick={onClose}>
            <ContentWrapper onClick={ev => ev.stopPropagation()}>
                <Title>Project detail</Title>
                <JustifiedRow>
                    <span style={{color: "red"}}>{errors.title}</span>
                    <ItemInput value={title} onChange={handleChange} placeholder="Title" />
                </JustifiedRow>
            <RightAlignedRow>
                <Button onClick={onClose} secondary>
                Cancel
                </Button>
                <Button onClick={handleSubmit}>Save</Button>
            </RightAlignedRow>
            </ContentWrapper>
        </Wrapper>
    )
}


ProjectModal.propTypes = {
    onSave: PropTypes.func,
    updateProject: PropTypes.func,
    onClose: PropTypes.func,
}
export default ProjectModal;
