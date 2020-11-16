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
        const formData = new FormData()
        formData.append('media', acceptedFiles[0], acceptedFiles[0].name)
        formData.append('user_id', userId)
        formData.append('project_id', projectId)
        formData.append('canvas_id', canvasId)
        const response = await api.post('/section', formData, { headers: { 'Content-Type': 'multipart/form-data' } })

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
