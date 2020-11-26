import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import Input from '../../components/Input'
import styled from 'styled-components'

const Buttons = styled.div`
  margin-top: 18px;
  display: flex;
`

const UploadViaUrl = ({ onClose, onUpload }) => {
  const [url, setUrl] = useState('')
  return (
    <Modal onClick={onClose}>
      <h2 style={{ marginBottom: 10 }}>Upload via URL</h2>
      <Input value={url} onChange={ev => setUrl(ev.target.value)} />
      <Buttons>
        <Button onClick={() => onUpload(url)}>Okay</Button>
        <Button onClick={onClose} secondary>
          Cancel
        </Button>
      </Buttons>
    </Modal>
  )
}

UploadViaUrl.propTypes = {
  onClose: PropTypes.func,
  onUpload: PropTypes.func,
}

export default UploadViaUrl
