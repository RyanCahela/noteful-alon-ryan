import React, { Component } from 'react'
import { MyContext } from '../AppContext';

export default class AddFolder extends Component {
    state = {
        folderName: '',
        hasError: true,
        errorMessage: ''
    }

    handleAddFolder(newFolderName) {
        this.setState({
            folderName: newFolderName
        }, () => {this.validateFolderName(this.state.folderName)})
    }

    validateFolderName(folderName) {
        if(folderName.length !== 0) {
            this.setState({hasError: false});
            return;
        } else {
            this.setState({
                hasError: true,
                errorMessage: 'Folder name must be at least 1 character long'
            })
        }  
    }

    handleSubmit(e) {
        e.preventDefault();
        let newFolder = {
            folder_title: this.state.folderName
        };
        e.target.reset()
        this.context.addFolder(newFolder);
    }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="addFolderInput">Add Folder</label>
          <input onChange={(e) => this.handleAddFolder(e.target.value)} id="addFolderInput" type="text" className="add-folder" />
          <button type="submit">Add</button>
      </form>
    )
  }
}

AddFolder.contextType = MyContext;
