import React, { useState, useEffect, useContext } from 'react';
import { Col, Container, Image, Row, Card, Button } from 'react-bootstrap';
import './collectionItem.scss';
import { Context } from '../../index';

const CollectionItem = (props) => {
  const { collection, deleteHandler, editHandler, itemHandler } = props;
  const [collectVisible, setCollectVisible] = useState(false);
  const { user } = useContext(Context);

  const CollectionMenu = () => {
    return (
      <Col md={4} style={{ position: 'relative' }}>
        <Row className="item-menu">
          <button className="item-menu_button" onClick={() => itemHandler()}>
            Add new item
          </button>
          <button
            className="item-menu_button"
            onClick={() => deleteHandler(collection.id)}
          >
            Delete collection
          </button>
          <button className="item-menu_button" onClick={() => editHandler()}>
            Edit collection
          </button>
        </Row>
      </Col>
    );
  };
  const menu = user.user.id == collection.owner_id ? <CollectionMenu/> : null;
  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + '/' + collection.image}
          />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center mb-5 mt-2">
            <h2>{collection.title}</h2>
          </Row>
          <Row
            className="d-flex flex-column align-items-center"
            style={{
              color: 'grey',
              fontSize: '20px',
              borderBottom: '1px solid grey',
            }}
          >
            <p>{collection.description}</p>
          </Row>
          <Row
            className="d-flex flex-column align-items-center tags"
            style={{ padding: 0 }}
          >
            <h3>Tags: </h3>
            <div className="mt-2">
              {collection.tags.map((tag) => (
                <div className="tags_item" key={tag.id}>
                  <span className="tags_text">{tag.text}</span>
                </div>
              ))}
            </div>
          </Row>
        </Col>
        {menu}
      </Row>
    </Container>
  );
};

export default CollectionItem;
