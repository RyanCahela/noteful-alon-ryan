import React from 'react'
import { Link } from 'react-router-dom';
import { MyContext } from '../AppContext';
import PropTypes from 'prop-types';


export default function ListNote(props) {

  const { note_id, note_name, note_content } = props.note;
  if (!note_content) {
    throw new Error();
  }

  return (
    <li className="note" key={note_id}>
      <Link to={`/notes/${note_id}`}>
        <h2 className="note-heading">{note_name}</h2>
      </Link>
      <p>{note_content}</p>
      <MyContext.Consumer>
        {(context) => {
          return <button onClick={() => context.deleteNote(note_id)} className="note-delete-btn">Delete Note</button>
        }}
      </MyContext.Consumer>
    </li>
  )
}

ListNote.propTypes = {
  note: PropTypes.object
}
