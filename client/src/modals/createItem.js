import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Dropdown, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { Formik, Field, ErrorMessage, useField } from 'formik';
import { observer } from 'mobx-react-lite';

import { Context } from '../index';
import { createItem, updateItem } from '../services/collectionService';
import './createCollection/modals.scss';

const CreateItem = observer(({ itemPayload, show, onHide }) => {
  const { collection, tags } = useContext(Context);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (itemPayload !== undefined) {
      setTitle(itemPayload.title);
      setDescription(itemPayload.description);
    }
  }, []);

  const editCollectHandler = (payload) => {
    setTitle(itemPayload.title);
    setDescription(itemPayload.description);
    setCollectTags(payload.tags);
  };

  const itemHandler = () => {
    if (itemPayload == undefined) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', file);
      validateInputs()
      if(!error) {
        createItem(id, formData).then((data) => onHide());
      }
      alert('Заполните все поля')
    } 
    else {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if(file !== null) {
        formData.append('image', file);
      }
      
      updateItem(id, itemPayload.id, formData).then((data) => onHide());
    }
  };

  const validateInputs = () => {
    if(title == '' || description == '' || file == null) {
      setError(true)
    }
  }
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {itemPayload ? 'Edit your item' : 'Add new item'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik>
          <Form className="modals-form">
            <Field
              value={title}
              className="mt-3 modals-from_control"
              name="title"
              placeholder="Enter item's name"
              onChange={(e) => setTitle(e.target.value)}
            />
            <ErrorMessage component="div" className="form_error" name="title" />
            <Field
              value={description}
              id="text"
              className="mt-3"
              name="description"
              placeholder="Enter item's description"
              as="textarea"
              onChange={(e) => setDescription(e.target.value)}
            />
            <ErrorMessage
              className="form_error"
              name="description"
              component="div"
            />

            {itemPayload ? (
              <div className="d-flex align-items-center">
                <label style={{ marginRight: '40px' }}>Your image: </label>
                <img
                  className="mt-2"
                  src={
                    process.env.REACT_APP_API_URL +
                    '/' +
                    itemPayload.image
                  }
                  style={{ height: '100px', width: '100px' }}
                />
              </div>
            ) : null}

            <Form.Control
              className="mt-3"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            
            <hr />
          </Form>
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger">Закрыть</Button>
        <Button variant="outline-success" onClick={itemHandler}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
export default CreateItem;
