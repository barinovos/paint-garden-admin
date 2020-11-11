import { useDropzone } from 'react-dropzone'
import { useCallback, useState } from 'react'
import api from '../utils/api'

const useDropzoneDefault = (projectId, canvasId, userId) => {
  const [uploading, setUploading] = useState(false)
  const onDrop = useCallback(
    async acceptedFiles => {
      // API CALL FOR UPLOAD (start)
      try {
        setUploading(true)
        const response = await api.post('/section', {
          project_id: projectId,
          canvas_id: canvasId,
          user_id: userId,
          media: acceptedFiles[0],
          position: {
            x: '50',
            y: '100',
          },
          dimensions: null,
          meta_data: [],
        })

        console.log({ response })
      } catch (error) {
        console.log(error)
      }

      setUploading(false)

      console.log({ acceptedFiles })
    },
    // API CALL FOR UPLOAD (end)

    [canvasId, projectId, userId],
  )

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({ onDrop, noClick: true })

  return { getRootProps, getInputProps, open, isDragActive, uploading }
}

export default useDropzoneDefault
