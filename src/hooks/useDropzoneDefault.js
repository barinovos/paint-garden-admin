import { useDropzone } from 'react-dropzone'
import { useCallback, useState } from 'react'

const useDropzoneDefault = (projectId, canvasId, userId, onUpload) => {
  const [uploading, setUploading] = useState(false)
  const onDrop = useCallback(
    async files => {
      // API CALL FOR UPLOAD (start)
      try {
        setUploading(true)
        await onUpload(files, userId, projectId, canvasId)
      } catch (error) {
        // console.log(error)
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
