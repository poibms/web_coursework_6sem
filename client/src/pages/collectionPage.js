import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import '../modals/createCollection/modals.scss';

import {
  getCollectionById,
  deleteCollection,
  updateCollection,
} from '../services/collectionService';
import CollectionItem from '../components/collectionItem/collectionItem';
import { MAIN_ROUTE } from '../config/routesConsts';
import { Context } from '../index';
import CreateCollection from '../modals/createCollection/createCollection';
import CreateItem from '../modals/createItem';

const CollectionPage = observer(() => {
  const [collectionState, setCollectionState] = useState({ tags: [] });
  const [collectVisible, setCollectVisible] = useState(false);
  const [itemVisible, setItemVisible] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { collection, tags } = useContext(Context);
  useEffect(() => {
    getCollectionById(id).then((data) => setCollectionState(data));
  }, []);

  const deleteHandler = (id) => {
    deleteCollection(id).then((data) => alert(data));
    navigate(MAIN_ROUTE);
  };
  const editHandler = () => {
    setCollectVisible(true);
  };

  const itemHandler = () => {
    setItemVisible(true);
  }

  return (
    <>
      <CollectionItem
        editHandler={editHandler}
        collection={collectionState}
        deleteHandler={deleteHandler}
        itemHandler={itemHandler}
      />
      {collectVisible ? (
        <CreateCollection
          collectionPayload={collectionState}
          show={collectVisible}
          onHide={() => setCollectVisible(false)}
        />
      ) : null}
      {itemVisible ? (
        <CreateItem show={itemVisible} onHide={() => setItemVisible(false)} />
      ) : null}
    </>
  );
});

export default CollectionPage;
