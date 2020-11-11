import { useDropzone } from 'react-dropzone'
import { useCallback, useState } from 'react'

const useDropzoneDefault = (projectId) => {
  const [uploading, setUploading] = useState(false);
  const onDrop = useCallback(acceptedFiles => {
    setUploading(true);
    // Do something with the files (call api to upload image)
    setUploading(false);

    console.log({ acceptedFiles })
  }, [])

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({ onDrop, noClick: true })

  return { getRootProps, getInputProps, open, isDragActive, uploading }
}

export default useDropzoneDefault
