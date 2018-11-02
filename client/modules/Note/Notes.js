import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';
import Edit from '../../components/Edit';
import styles from './Notes.css';

const Notes = ({ notes, laneId, editNote, updateNote, deleteNote, moveWithinLane }) => {
  return (
    <ul className={styles.Notes}>
      {
        notes.map((note, id) =>
          <Note
            id={note.id}
            key={note.id || id}
            moveWithinLane={moveWithinLane}
            laneId={laneId}
            editing={note.editing}
            _id={note._id}
          >
            <Edit
              editing={note.editing}
              styles={styles.NoteEdit}
              value={note.task}
              onValueClick={() => editNote(note.id)}
              onUpdate={(task) => updateNote({
                ...note,
                task,
                editing: false,
              })}
              onDelete={() => deleteNote(note.id, laneId)}
            />
          </Note>
        )
      }
    </ul>
  );
};

Notes.propTypes = {
  deleteNote: PropTypes.func,
  updateNote: PropTypes.func,
  laneId: PropTypes.string,
  editNote: PropTypes.func,
  notes: PropTypes.array,
  moveWithinLane: PropTypes.func,
};

export default Notes;
