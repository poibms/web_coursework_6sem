import { React, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import './adminDropDown.scss';
import { useNavigate } from 'react-router-dom';

import CreateTags from '../../modals/createTags'
import { ADMINCOLLLIST_ROUTE, ADMINUSERLIST_ROUTE } from '../../config/routesConsts';

const AdminDropDown = () => {
  const [collectVisible, setCollectVisible] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Dropdown className="drop">
        <Dropdown.Toggle>Admin Panel</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setCollectVisible(true)}>
            Tags
          </Dropdown.Item>
          <Dropdown.Item onClick={() => navigate(ADMINCOLLLIST_ROUTE)}>User's collections</Dropdown.Item>
          <Dropdown.Item onClick={() => navigate(ADMINUSERLIST_ROUTE)}>List of users</Dropdown.Item>
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
