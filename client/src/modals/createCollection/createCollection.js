import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Dropdown, Form } from 'react-bootstrap';
import { getAllTags } from '../../services/tagsService';
import { useParams } from 'react-router-dom';
import {
  createCollection,
  updateCollection,
} from '../../services/collectionService';
import { Formik, Field, ErrorMessage, useField } from 'formik';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import * as yup from 'yup';
import './modals.scss';

const CreateCollection = observer(({ collectionPayload, show, onHide }) => {
  const { collection, tags } = useContext(Context);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [collectTags, setCollectTags] = useState([]);
  const [tagsState, setTagsState] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getAllTags().then((data) => tagsHandler(data));
    if (collectionPayload !== undefined) {
      setTitle(collectionPayload.title);
      setDescription(collectionPayload.description);
      setCollectTags(collectionPayload.tags);
      collectionPayload.tags.forEach((tag) => {
        setTagsState(tagsState.filter((i) => i.id != tag.id));
      });
    }
  }, []);
  const tagsHandler = (data) => {
    console.log(data);
    tags.setTags(data);
    setTagsState(data);
  };

  const editCollectHandler = (payload) => {
    setTitle(collectionPayload.title);
    setDescription(collectionPayload.description);
    setCollectTags(payload.tags);
    payload.tags.forEach((tag) => {
      console.log(tag);
      console.log(tagsState);
      setTagsState(tagsState.filter((i) => i.id != tag.id));
      console.log(tagsState.filter((i) => i.id != tag.id));
    });
  };

  const addTag = (tag) => {
    setTagsState(tagsState.filter((i) => i.id != tag.id));
    setCollectTags([...collectTags, tag]);
  };

  const removeTag = (tag) => {
    setCollectTags(collectTags.filter((i) => i.id !== tag.id));
    setTagsState([...tagsState, tag]);
  };

  const addDevice = () => {
    if (collectionPayload == undefined) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', file);
      formData.append('tags', JSON.stringify(collectTags));
      createCollection(formData).then((data) => onHide());
    } else {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if(file !== null) {
        console.log('if')
        console.log(file)
        formData.append('image', file);
      } else {
        console.log('else')
        console.log(file)
        formData.append('image', collectionPayload.image);
      }
      if(collectionPayload.tags !== collectTags) {
        formData.append('tags', JSON.stringify(collectTags));
      }
      updateCollection(id, formData).then((data) => onHide());
    }
  };
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {collectionPayload ? 'Edit your collection' : 'Add collection'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            title: '',
            description: '',
            file: {},
          }}
          validationSchema={yup.object({
            title: yup.string().required('* Обязательное поле'),
            description: yup
              .string()
              .min(4, 'Минимальная длинна пароля 4 символа')
              .required('* Обязательное поле'),
            file: yup.mixed().required('Файл обязателен'),
          })}
        >
          <Form className="modals-form">
            <Field
              value={title}
              className="mt-3 modals-from_control"
              name="title"
              placeholder="Введите название коллекции"
              onChange={(e) => setTitle(e.target.value)}
            />
            <ErrorMessage component="div" className="form_error" name="title" />
            <Field
              value={description}
              id="text"
              className="mt-3"
              name="description"
              placeholder="Описание"
              as="textarea"
              onChange={(e) => setDescription(e.target.value)}
            />
            <ErrorMessage
              className="form_error"
              name="description"
              component="div"
            />

            {collectionPayload ? (
              <div className="d-flex align-items-center">
                <label style={{ marginRight: '40px' }}>Your image: </label>
                <img
                  className="mt-2"
                  src={
                    process.env.REACT_APP_API_URL +
                    '/' +
                    collectionPayload.image
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
            <label className="modals-form_label">Выберите теги</label>

            <div className="tags">
              {collectTags.length > 0 ? (
                <div className="tags_container">
                  {collectTags.map((tag) => (
                    <div className="tags_item" key={tag.id}>
                      <span className="tags_text">{tag.text}</span>
                      <span
                        className="tags_close"
                        onClick={() => removeTag(tag)}
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="tags_stub">Вы ещё не выбрали теги</span>
              )}

              {tagsState.length > 0 ? (
                <div className="tags_container">
                  {tagsState.map((tag) => (
                    <div
                      className="tags_item"
                      key={tag.id}
                      onClick={() => addTag(tag)}
                    >
                      <span className="tags_text">{tag.text}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="tags_stub">Нет доступных тегов</span>
              )}
            </div>
            <hr />
          </Form>
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger">Закрыть</Button>
        <Button variant="outline-success" onClick={addDevice}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
export default CreateCollection;
