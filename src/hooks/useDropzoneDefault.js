import { useDropzone } from 'react-dropzone'
import { useCallback, useState } from 'react'
import api from '../utils/api'

const useDropzoneDefault = (projectId, canvasId, userId) => {
  const [uploading, setUploading] = useState(false)
  const onDrop = useCallback(
    async acceptedFiles => {
      // API CALL FOR UPLOAD (start)
      console.log({ acceptedFiles })
      // INFO: ADD 'Content-Type': 'multipart/form-data' HEADER to this REQ (somehow)
      try {
        setUploading(true)
        const response = await api.post(
          '/section',
          {
            project_id: projectId,
            canvas_id: canvasId,
            user_id: userId,
            media: acceptedFiles[0],
          },
        );

        console.log({ response })
      } catch (error) {
        console.log(error)
      }

      setUploading(false)
    },
    // API CALL FOR UPLOAD (end)

    [canvasId, projectId, userId],
  )

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({ onDrop, noClick: true })

  return { getRootProps, getInputProps, open, isDragActive, uploading }
}

export default useDropzoneDefault
