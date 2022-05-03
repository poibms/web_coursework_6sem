import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, Col, Image } from 'react-bootstrap';
import { COLLECTION_ROUTE, PROFILE_ROUTE } from '../../config/routesConsts';

import './collectionListItem.scss';

const CollectionItem = ({ collection }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isProfilePath = location.pathname === PROFILE_ROUTE
  return (
    <Col
      md={3}
      className="mt-3"
      onClick={() => navigate(COLLECTION_ROUTE + '/' + collection.id)}
    >
      <Card style={{ width: 250, cursor: 'pointer' }}>
        <Image
          width={250}
          height={250}
          src={process.env.REACT_APP_API_URL + '/' + collection.image}
        />
        <Card.Body>
          <Card.Title>{collection.title}</Card.Title>
          <Card.Text>
            {collection.description}
          </Card.Text>
            {collection.tags.map(tag => {
              return (
                <span className="card-tags" key={tag.id}>{tag.text}</span>
              )
            })}
        </Card.Body>
      </Card>
    </Col>
  );
};
export default CollectionItem;
