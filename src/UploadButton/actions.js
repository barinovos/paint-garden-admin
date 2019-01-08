import actionTypes from '../constants/actionTypes';
import api from '../utils/api';

export function uploadImages(files) {
  return dispatch => {
    console.log(files);
    const formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      const file = files[i];
      // Check the file type.
      if (!file.type.match('image.*')) {
        continue;
      }
      // Add the file to the request.
      formData.append('images[]', file, file.name);
    }
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(resp => resp.data)
      .then(images => dispatch({ type: actionTypes.IMAGE_UPLOADED, images }))
      .catch(err => console.log(err))
  }
}
