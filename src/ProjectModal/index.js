import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Wrapper, ContentWrapper, Image, AddImage, HiddenInput } from './Styled'
import { Button, Title, ItemInput, JustifiedRow, RightAlignedRow } from '../Common/Styled'
import { ProjectType } from '../types'
import add from '../assets/add.svg'

const ProjectModal = ({onSave, updateProject, onClose}) => {
    const [title, setTitle]             = useState(updateProject !== null ? updateProject.title : "");
    const [errors, setError]            = useState([]);
    const [project_id, setProjectID]    = useState(updateProject !== null ? updateProject.id : null);
    const [temp_path, setTempPath]      = useState("");
    const [image_url, setImageUrl]      = useState(updateProject !== null ? updateProject.image : null);
    const [image, setImage]             = useState("");
    const minTitleLength                = 6;
    const handleSubmit = () => {
        if (title.length > minTitleLength) {
            onSave({
                id: project_id,
                title:title,
                image:image
            });
        }
    }

    const handleChange = ev => {
        const title = ev.target.value;
        let errors  = {};
        if (title.length < minTitleLength) {
            errors.title = `Length of the title must be bigger than ${minTitleLength}`;
            setError(errors);
        } else {
            setError({});
        }
        setTitle(ev.target.value)
    }


    const onUploadChangeImage =  ev => {
        setImage(ev.target.files[0]);
        setTempPath(URL.createObjectURL(ev.target.files[0]));
    }

    return (
        <Wrapper onClick={onClose}>
            <ContentWrapper onClick={ev => ev.stopPropagation()}>
                <Title>Project detail</Title>
                <JustifiedRow  >
                    <ItemInput value={title} onChange={handleChange} placeholder="Title" />
                </JustifiedRow>
                <span style={{display: "block",color: "red", fontSize: "12px"}}>{errors.title}</span>
                {project_id ?
                    (updateProject.picture ? (
                    <Image src={updateProject.picture} />
                    ) : (
                    <AddImage>
                        <img style = {{maxWidth: "100%", maxHeight: "100%" }} src={temp_path ? temp_path : (image_url ? image_url : add)} alt="upload" />
                        <HiddenInput onChange={onUploadChangeImage} />
                    </AddImage>
                    )) : (
                    <AddImage >
                        <img src={temp_path ? temp_path : add} alt="upload" />
                        <HiddenInput onChange={onUploadChangeImage} />
                    </AddImage>
                )}
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
    updateProject: ProjectType,
    onClose: PropTypes.func,
}
export default ProjectModal;
