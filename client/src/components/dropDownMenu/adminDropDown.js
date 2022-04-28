import { React, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import './adminDropDown.scss';

import CreateTags from '../../modals/createTags'

const AdminDropDown = () => {
  const [collectVisible, setCollectVisible] = useState(false);
  return (
    <>
      <Dropdown className="drop">
        <Dropdown.Toggle>Admin Panel</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setCollectVisible(true)}>
            Tags
          </Dropdown.Item>
          <Dropdown.Item>User's collections</Dropdown.Item>
          <Dropdown.Item>List of users</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <CreateTags
        show={collectVisible}
        onHide={() => setCollectVisible(false)}
      />
    </>
  );
};
export default AdminDropDown;
