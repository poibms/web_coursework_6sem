import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { createTag } from '../services/tagsService';

const CreateTag = ({show, onHide}) => {

  const [tag, setTag] = useState('');

  const addTag =() => {
    createTag({text: tag}).then(data => {
      setTag('');
      onHide();
    })
    .catch(err =>alert(err));
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new tag
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder={'Enter tag name'}
            value={tag}
            onChange={e => setTag(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-success' onClick={addTag}>Submit</Button>
      </Modal.Footer>
    </Modal>
  )
}
export default CreateTag;