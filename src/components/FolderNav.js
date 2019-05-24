import React from 'react';
import { NavLink } from 'react-router-dom';
import AddFolder from './AddFolder';
import PropTypes from 'prop-types';

function FolderNav(props) {
  let folders = props.folders.map((folder) => {
    return <NavLink
      to={`/folders/${folder.folder_id}`}
      key={folder.folder_id}
      activeClassName='highlight'>
      <li className='folder' key={folder.folder_id}>{folder.folder_title}</li>
    </NavLink>
  });

  return (
    <nav className="sidebar">
      <ul className="folders-list">
        {folders}
      </ul>
      <AddFolder />
    </nav>
  );
}

FolderNav.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.object)
}

export default FolderNav;
