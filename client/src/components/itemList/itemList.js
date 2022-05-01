import { React, useEffect } from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

import './itemList.scss';

const ItemList = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <Col
          md={3}
          className="mt-3"
          key={item.id}
        >
          <Card style={{ width: 250, cursor: 'pointer' }}>
            <Image
              width={250}
              height={250}
              src={process.env.REACT_APP_API_URL + '/' + item.image}
            />
            <Card.Body>
              <Card.Title>{item.title} </Card.Title>
              <Card.Text>{item.description}</Card.Text>
            </Card.Body>
            <Card.Footer>
            <MdDelete className='icons' />
            <AiFillEdit className='icons' />
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default ItemList;
