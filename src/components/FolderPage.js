import React from 'react';
import FolderNav from './FolderNav';
import List from './List';
import { MyContext } from '../AppContext';

function FolderPage(props) {

  const { folderId } = props.match.params;
  return (
    <MyContext.Consumer>
      {(context)=> {
        return (
          <div className="container">
            <FolderNav folders={context.folders} selectedFolderId={folderId} />
            <main className="main">
              <List notes={context.notes} folderId={folderId} folders={context.folders}/>
            </main>
          </div>
        )
      }}
    </MyContext.Consumer>
  );
}

export default FolderPage;
