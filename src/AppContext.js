import React, { Component } from 'react'

export const MyContext = React.createContext()

class AppContext extends Component {

    state = {
        folders: [],
        notes: [],
    };

    componentDidMount() {
        fetch('https://thawing-badlands-32722.herokuapp.com/api/folders')
            .then(res => res.json())
            .then(resJson => this.setState(() => {
                return { folders: resJson }
            }))
            .catch(err => new Error(err));

        fetch('https://thawing-badlands-32722.herokuapp.com/api/notes')
            .then(res => res.json())
            .then(resJson => this.setState(() => {
                return { notes: resJson }
            }))
            .catch(err => new Error(err));
    }

    deleteNote = (noteId) => {
        fetch(`https://thawing-badlands-32722.herokuapp.com/api/notes/${noteId}`, {
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
        fetch('https://thawing-badlands-32722.herokuapp.com/api/notes', {
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
        fetch('https://thawing-badlands-32722.herokuapp.com/api/folders', {
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

    deleteFolder = (folderId) => {
      console.log(folderId);
      fetch(`https://thawing-badlands-32722.herokuapp.com/api/folders/${folderId}`, {
        method: 'DELETE',
      })
      .then(res => {
        this.setState((currentState) => {
          let newFoldersList = currentState.folders.filter((folder) => {
            return folder.folder_id !== folderId;
          });
          return {
            folders: newFoldersList
          }
        });
      })
    }

    render() {
        return (
            <MyContext.Provider value={{
                folders: this.state.folders,
                notes: this.state.notes,
                deleteNote: this.deleteNote,
                addNote: this.addNote,
                addFolder: this.addFolder,
                deleteFolder: this.deleteFolder
            }}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}

export default AppContext;
