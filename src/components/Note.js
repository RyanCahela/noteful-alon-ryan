import React from 'react'
import { MyContext } from '../AppContext';
import { Link } from 'react-router-dom';

export default function Note(props) {

  return (
    <>
    <ul className="notes-list">
      <li className="note">
        <h2 className="note-heading">{props.note.note_name}</h2>
      </li>
    </ul>
    <p>
      {props.note.note_content}
    </p>
    <MyContext.Consumer>
      {(context) => {
        return (
            <button onClick={() => context.deleteNote(props.note.note_id)}>
              <Link to="/">Delete</Link>
            </button>
        )
      }}
    </MyContext.Consumer>
    </>
  )
}

