import React, { useEffect, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { getCollections } from '../services/collectionService';
import { getAllTags } from '../services/tagsService';
import CollectionList from '../components/collectionList/collectionList';
import { Col, Row, Container } from 'react-bootstrap';

const MainPage = observer(() => {
  const { collection, tags } = useContext(Context);

  useEffect(() => {
    getCollections().then((data) => setData(data)); 
    getAllTags().then((data) => console.log(data));
  }, []);

  
  const setData = (data) => {
    collection.setCollections(data);
    console.log(data);
  }

  return (
    <Container>
      <h1>Main Page</h1>
      <Row>
        <Col md={3} className="mt-2">
          <h1>FiltersTags</h1>
        </Col>

        <Col md={9} className="mt-2">
          <CollectionList collections={collection.collections} />
        </Col>
      </Row>
    </Container>
  );
});

export default MainPage;
