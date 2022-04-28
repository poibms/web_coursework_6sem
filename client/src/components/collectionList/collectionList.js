import React from 'react';
import CollectionItem from '../collectionListItem/collectionListItem';
import { Row } from 'react-bootstrap';
import {observer} from "mobx-react-lite";

const CollectionList = observer(({collections}) => {
  console.log(collections);
  return (
    <>
      <Row className='d-flex'>
        {collections.map((collect) => (
          <CollectionItem key={collect.id} collection={collect} />
        ))}
      </Row>
    </>
  );
});
export default CollectionList;
