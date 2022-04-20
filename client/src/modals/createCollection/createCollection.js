import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Dropdown, Form } from 'react-bootstrap';
import { getAllTags } from '../../services/tagsService';
import { createCollection } from '../../services/collectionService';
import { Formik, Field, ErrorMessage, useField } from 'formik';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import * as yup from 'yup';
import './modals.scss';

const CreateCollection = observer(({ show, onHide }) => {
  const { collection } = useContext(Context);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getAllTags().then((data) => collection.setTags(data));
  }, [collection]);


  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addTag = (tag) => {
    collection.setTags(collection.tags.filter((i) => i.id != tag.id));
    setTags([...tags, tag]);
  };

  const removeTag = (tag) => {
    setTags(tags.filter((i) => i.id !== tag.id));
    collection.setTags([...collection.tags, tag]);
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', file);
    formData.append('tags', JSON.stringify(tags));
    createCollection(formData).then((data) => onHide());
  };
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить коллекцию
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
            <Form.Control className="mt-3" type="file" onChange={selectFile} />
            <label className="modals-form_label">Выберите теги</label>

            <div className="tags">
              {tags.length > 0 ? (
                <div className="tags_container">
                  {tags.map((tag) => (
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

              {collection.tags.length > 0 ? (
                <div className="tags_container">
                  {collection.tags.map((tag) => (
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
