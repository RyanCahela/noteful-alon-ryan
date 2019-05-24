import React from 'react';
import UUID from 'uuid/v4';
import { MyContext } from '../AppContext';
import PropTypes from 'prop-types';


export default class AddNote extends React.Component {
    state = {
        noteName: '',
        content: '',
        folderName: '',
        hasError: false,
        errorMessage: '',
        folderId: '1'
    }

    updateName(noteName) {
        this.setState({
            noteName: noteName
        })
    }

    validateNoteName(noteName, callback) {
        if(noteName.length !== 0) {
            this.setState({hasError: false},() => {
                callback();
            });
            console.log('name longer than 0');
        } else {
            this.setState({
                hasError: true,
                errorMessage: 'Note name must be at least 1 character long'
            },()=>{ callback() })
        }
    }

    updateContent(content) {
        this.setState({
            content: content
        })
    }

    updateFolderId(folderId) {
        this.setState({
            folderId: folderId
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.validateNoteName(this.state.noteName, ()=> {
            if(!this.state.hasError) {
                let newNote ={
                    note_name: this.state.noteName,
                    folder_id: this.state.folderId,
                    note_content: this.state.content
                }
                this.context.addNote(newNote);
                this.setState({
                    noteName: '',
                    content: ''
                })
                return;
            } else {
                console.log('error name not valid');
            }
        });
    }

    displayErrorMessage = (message) => {
        return <div style={{color: "red"}}>{message}</div>
    }

    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <label htmlFor="addNoteName">Note Name</label>
                <input type="text" value={this.state.noteName}onChange={(e) => this.updateName(e.target.value)} />
                <label htmlFor="addNoteContent">Content</label>
                <input type="text" value={this.state.content} onChange={(e) => this.updateContent(e.target.value)} />
                <label htmlFor="addNoteFolder">Folder Name</label>
                <select onChange={(e) => this.updateFolderId(e.target.value)}>
                    {this.props.folders.map(folder => {
                        let selected = false;
                        if(folder.folder_id === Number(this.state.folderId)) {
                          selected = true;
                        }
                        return (
                            <option key={folder.folder_id} value={folder.folder_id} selected={selected}>{folder.folder_title}</option>
                        )
                    })}
                </select>
                <button type="submit">Submit</button>
                {this.state.hasError && this.displayErrorMessage(this.state.errorMessage)}
            </form>
        )
    }
}

AddNote.propTypes = {
    folders: PropTypes.arrayOf(PropTypes.object)
}

AddNote.contextType = MyContext;