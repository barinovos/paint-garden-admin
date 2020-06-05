import React,  { useState } from 'react'
import PropTypes from 'prop-types'
import { Wrapper, ImagesWrapper, UploadButton, HiddenInput} from './Styled'
import * as actions from '../Sections/actions'
import upload from '../assets/upload_ribbon.svg'
import { Icon } from '../Common/Styled'
const UploadRibbon = ({item, uploadImages , project_id, selectedItemId, onChangeActiveImageIndex}) => {

    return(
        <Wrapper>
            <UploadButton>
                <HiddenInput onChange={ev => uploadImages({ image: ev.target.files[0], project_id: project_id}, item.id)}/>
                <Icon style={{padding: '6px 7px', paddingRight: '20px', borderRight: '1px solid #F0F3F4', marginRight: '10px'}}  src={upload} />
            </UploadButton>
            {item.images_section && item.images_section.map((image, i) => (
                <img
                    alt={image.id}
                    key={i}
                    src ={image.url_thumb}
                    style = {{
                        width: '35px',
                        marginLeft: '10px',
                        border: item.path === image.url ? 'solid 1px #4DA1FF' : 'none',
                    }}
                    onClick={() => onChangeActiveImageIndex(i)}
                />
            ))}
        </Wrapper>
    )

}

export default UploadRibbon
