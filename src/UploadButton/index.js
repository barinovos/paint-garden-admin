import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HiddenInput } from './Styled';
import { Button } from '../Common/Styled';
import { uploadImages } from './actions';

const UploadButton = ({ uploadImages }) => (
  <Button>
    Upload image
    <HiddenInput onChange={ev => uploadImages(ev.target.files)}/>
  </Button>
);

UploadButton.propTypes = {
  uploadImages: PropTypes.func,
};

export default connect(null, dispatch => bindActionCreators({ uploadImages }, dispatch))(UploadButton);
