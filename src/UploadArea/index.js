import React,  { useState } from 'react'
import PropTypes from 'prop-types'
import { Wrapper } from './Styled'
import { canvasTopOffset, canvasLeftOffset, reCalcSizeWithZoom } from '../utils/calcZoom'
import UploadModal from './UploadModal'
import * as actions from '../Sections/actions'
const UploadArea = ({addUpload, zoomLevel, project_id}) => {
    const [ShowModal, setShowModal] = useState(false)
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const onUpload = ev => {
        setX(reCalcSizeWithZoom(ev.clientX - canvasLeftOffset, zoomLevel));
        setY(reCalcSizeWithZoom(ev.clientY - canvasTopOffset, zoomLevel));
        setShowModal(true)
        //onSave(x, y);
    }

    const onSave = data => {
        data.x = x;
        data.y = y;
        addUpload(data);
        setShowModal(false);
    }


    const onClose = () => {
        setShowModal(false)
    }

    return(
        <Wrapper onClick={onUpload}>

        {ShowModal && (
            <UploadModal
                onSave={onSave}
                onClose={onClose}
                project_id={project_id}
            />
        )}
        </Wrapper>
    )
}


export default UploadArea
