import { useDropzone } from 'react-dropzone'
import { useCallback, useState } from 'react'
import { uploadMedia } from '../Canvas/actions'

const useDropzoneDefault = (projectId, canvasId, userId) => {
  const [uploading, setUploading] = useState(false)
  const onDrop = useCallback(
    async ([file]) => {
      // API CALL FOR UPLOAD (start)
      try {
        setUploading(true)
        await uploadMedia(file, userId, projectId, canvasId)
      } catch (error) {
        // console.log(error)
      }

      setUploading(false)
      window.location.reload()
    },
    // API CALL FOR UPLOAD (end)

    [canvasId, projectId, userId],
  )

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({ onDrop, noClick: true })

  return { getRootProps, getInputProps, open, isDragActive, uploading }
}

export default useDropzoneDefault
