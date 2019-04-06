import React, { Component } from 'react'

export const MyContext = React.createContext()

class AppContext extends Component {

    state = {
        folders: [],
        notes: [],
    };

    componentDidMount() {
        fetch('http://localhost:9090/folders')
        .then(res => res.json())
        .then(resJson => this.setState({folders: resJson}))
        .catch(err => new Error(err));

        fetch('http://localhost:9090/notes')
        .then(res => res.json())
        .then(resJson => this.setState({notes: resJson}))
        .catch(err => new Error(err));
    }



    deleteNote = (noteId) => {
        let newNotes = this.state.notes.filter((note) => {
            return note.id !== noteId;
        })
        this.setState({
            notes: newNotes
        });
    }

    addNote = (newNote) => {
        fetch('http://localhost:9090/notes', {
            method: 'POST',
            body: JSON.stringify(newNote),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res);
            if (res.status === 201) {
                let newNotes = this.state.notes;
                newNotes.unshift(newNote);
                this.setState({
                    notes: newNotes
                });
                return res;
            }
            throw new Error('POST failed for some reason')
        })
        .catch(error => console.error('Error:', error))
    }

    addFolder = (newFolder) => {
        fetch('http://localhost:9090/folders', {
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
        <MyContext.Provider value={{...this.state,
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
