import React, { useEffect, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { getCollections, getCollByTags } from '../services/collectionService';
import { getAllTags } from '../services/tagsService';
import CollectionList from '../components/collectionList/collectionList';
import FilterTags from '../components/filterTags/filterTags';
import { Col, Row, Container } from 'react-bootstrap';

const MainPage = observer(() => {
  const { collection, tags } = useContext(Context);
  // const [collectionList, setCollectionList] = useState(collection.collections);
  useEffect(() => {
    getCollections().then((data) => setData(data)); 
    getAllTags().then((data) => tags.setTags(data));
  }, []);

  
  const setData = (data) => {
    collection.setCollections(data);
  }

  const filterHandler = (tags = []) => {
    if(tags.length != 0) {
      getCollByTags(tags).then((data) => setData(data));
    } else {
      getCollections().then((data) => setData(data));
    }
  }

  return (
    <Container>
      <h1>Collections</h1>
      <Row>
        <Col md={2} className="mt-2"
        style={{borderRight: '1px solid #adb5bd'}}>
          <FilterTags filterHandler={filterHandler}/>
        </Col>

        <Col md={10} className="mt-2">
          <CollectionList collections={collection.collections} />
        </Col>
      </Row>
    </Container>
  );
});

export default MainPage;
