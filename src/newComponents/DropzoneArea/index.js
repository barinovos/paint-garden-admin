import React, { useCallback} from 'react';
import {useDropzone} from 'react-dropzone'


const DropzoneArea = () => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log({acceptedFiles})
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return   <div {...getRootProps()} style={{ width: '500px', backgroundColor: 'white', height: '500px', margin: '100px' }}>
  <input {...getInputProps()} />
  {
    isDragActive ?
      <p>Drop the files here ...</p> :
      <p>Drag 'n' drop some files here, or click to select files</p>
  }
  </div>
}

export default DropzoneArea