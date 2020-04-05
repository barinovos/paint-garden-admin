import React from 'react';
import PropTypes from 'prop-types';
import { HiddenInput } from './Styled';
import { Button } from '../Common/Styled';

const UploadButton = ({ uploadImages, sectionId, projectId }) => (
  <Button>
    Upload image
    <HiddenInput onChange={ev => uploadImages(ev.target.files, sectionId, projectId)}/>
  </Button>
);

UploadButton.propTypes = {
  uploadImages: PropTypes.func.isRequired,
  sectionId: PropTypes.string
};

export default UploadButton;
