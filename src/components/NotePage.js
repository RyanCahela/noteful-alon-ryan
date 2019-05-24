import React from 'react';
import Note from './Note';
import { Link } from 'react-router-dom';
import { MyContext } from '../AppContext';


function NotePage(props) {
  console.log(props);

  let { noteId } = props.match.params;

  return (
    <MyContext.Consumer>
      {(context) => {

        let note = context.notes.find((note) => {
          return note.note_id === noteId
        })

        return (
          <div className="container">
            <nav className="sidebar">
              <Link to={`/folder/${note.folderId}`}
                className="sidebar-go-back">Go Back</Link>
            </nav>
            <main className="main">
              <Note note={note} />
            </main>
          </div>
        )
      }}
    </MyContext.Consumer>
  );
}

export default NotePage;
