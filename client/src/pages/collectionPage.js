import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import '../modals/createCollection/modals.scss';

import {
  getCollectionById,
  deleteCollection,
  deleteItem
} from '../services/collectionService';
import CollectionItem from '../components/collectionItem/collectionItem';
import { MAIN_ROUTE } from '../config/routesConsts';
import { Context } from '../index';
import CreateCollection from '../modals/createCollection/createCollection';
import CreateItem from '../modals/createItem';

const CollectionPage = observer(() => {
  const [collectionState, setCollectionState] = useState({ tags: [], items: [] });
  const [collectVisible, setCollectVisible] = useState(false);
  const [itemVisible, setItemVisible] = useState(false);
  const [itemPayload, setItemPayload] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const { collection, tags } = useContext(Context);

  useEffect(() => {
    getCollectionById(id).then((data) => setCollectionState({ ...data.collection, items: data.collectItems }));
  }, []);

  const deleteHandler = (id) => {
    deleteCollection(id).then((data) => alert(data));
    collection.setCollections(collection.collections.filter((i) => i.id != id));
    navigate(MAIN_ROUTE);
  };

  const editHandler = () => {
    setCollectVisible(true);
  };

  const itemHandler = (payload = undefined) => {
    setItemPayload(payload);
    setItemVisible(true);
  }

  const deleteCollItem = (colId) => {
    deleteItem(id, colId).then(() =>
      setCollectionState({ ...collectionState, items: collectionState.items.filter((i) => i.id != colId) }));
  }


  return (
    <>
      <CollectionItem
        editHandler={editHandler}
        collection={collectionState}
        deleteHandler={deleteHandler}
        itemHandler={itemHandler}
        deleteItem={deleteCollItem}
      />
      {collectVisible ? (
        <CreateCollection
          collectionPayload={collectionState}
          show={collectVisible}
          onHide={() => setCollectVisible(false)}
        />
      ) : null}
      {itemVisible ? (
        <CreateItem itemPayload={itemPayload} show={itemVisible} onHide={() => setItemVisible(false)} />
      ) : null}
    </>
  );
});

export default CollectionPage;
