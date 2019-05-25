import React, { Component } from 'react'

export const MyContext = React.createContext()

class AppContext extends Component {

    state = {
        folders: [],
        notes: [],
    };

    componentDidMount() {
        fetch('http://localhost:7000/api/folders')
            .then(res => res.json())
            .then(resJson => this.setState(() => {
                return { folders: resJson }
            }))
            .catch(err => new Error(err));

        fetch('http://localhost:7000/api/notes')
            .then(res => res.json())
            .then(resJson => this.setState(() => {
                return { notes: resJson }
            }))
            .catch(err => new Error(err));
    }

    deleteNote = (noteId) => {
        fetch(`http://localhost:7000/api/notes/${noteId}`, {
          method: 'DELETE'
        })
        .then(res => {
          let newNotes = this.state.notes.filter((note) => {
            return note.note_id !== noteId;
          });
          this.setState({
              notes: newNotes
          });
        });
    }

    addNote = (newNote) => {
        fetch('http://localhost:7000/api/notes', {
            method: 'POST',
            body: JSON.stringify(newNote),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
          if(res.status === 201) {
            return res.json();
          }
          else {
            throw new Error('POST failed for some reason')
          }
        })
        .then(resJson => {
            console.log(resJson);
            let newNotes = this.state.notes;
            newNotes.unshift(resJson);
            this.setState({
                notes: newNotes
            });
        })
        .catch(error => console.error('Error:', error))
    }

    addFolder = (newFolder) => {
        console.log(newFolder);
        fetch('http://localhost:7000/api/folders', {
            method: 'POST',
            body: JSON.stringify(newFolder),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res);
                if (res.status === 201) {
                    let newFolderList = this.state.folders;
                    newFolderList.push(newFolder);
                    this.setState({
                        folders: newFolderList
                    })
                    return;
                }
                throw new Error('POST failed for some reason')
            })
            .catch(error => console.error('Error:', error))
    }

    render() {
        return (
            <MyContext.Provider value={{
                folders: this.state.folders,
                notes: this.state.notes,
                deleteNote: this.deleteNote,
                addNote: this.addNote,
                addFolder: this.addFolder,
            }}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}

export default AppContext;
