import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUser from '../../helpers/data/authData';
import { createPin, updatePin, getPinBoardToDelete } from '../../helpers/data/pinData';
import boardData from '../../helpers/data/boardData';

export default class PinForm extends Component {
  state = {
    firebaseKey: this.props.pin?.firebaseKey || '',
    name: this.props.pin?.name || '',
    imageUrl: this.props.pin?.imageUrl || '',
    url: this.props.pin?.url || '',
    UserId: this.props.pin?.UserId || '',
    description: this.props.pin?.description || '',
    private: this.props.pin?.private || 'false',
    boards: [],
    success: false,
  };

  boardsRef = React.createRef();

  componentDidMount() {
    const UserId = getUser();
    this.getBoards(UserId).then((response) => {
      this.setState({
        UserId,
        boards: response,
      });
    });
  }

  handleChange = (e) => {
    if (e.target.name === 'filename') {
      this.setState({ imageUrl: '' });
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(
        `pinterest/${this.state.userId}/${Date.now()}${e.target.files[0].name}`,
      );
      imageRef.put(e.target.files[0]).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((imageUrl) => {
          this.setState({ imageUrl });
        });
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.firebaseKey === '') {
      const newPin = {
        name: this.state.name,
        description: this.state.description,
        imageUrl: this.state.imageUrl,
        url: this.state.url,
        firebaseKey: this.state.firebaseKey,
        UserId: this.state.UserId,
        private: this.state.private,
      };
      createPin(newPin).then((response) => {
        const pinBoard = {
          boardId: this.boardsRef.current.value,
          pinId: response.data.firebaseKey,
          userId: this.state.UserId,
        };
        boardData.createPinBoard(pinBoard);
      }).then(() => {
        this.props.onUpdate?.(this.props.boardId);
        this.setState({
          success: true,
        });
      });
    } else {
      getPinBoardToDelete(this.state.firebaseKey);
      const updatedPin = {
        name: this.state.name,
        description: this.state.description,
        imageUrl: this.state.imageUrl,
        firebaseKey: this.state.firebaseKey,
        url: this.state.url,
        UserId: this.state.UserId,
        private: this.state.private,
      };
      updatePin(updatedPin).then(() => {
        const updatedPinBoard = {
          boardId: this.boardsRef.current.value,
          pinId: this.state.firebaseKey,
          userId: this.state.UserId,
        };
        boardData.createPinBoard(updatedPinBoard);
        this.props.onUpdate?.(this.props.pin.firebaseKey);
        this.setState({
          success: true,
        });
      });
    }
  };

  getBoards = (uid) => (
    boardData.getAllUserBoards(uid).then((response) => response)
  )

  render() {
    const {
      name, boards, description, imageUrl, url,
    } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        {(this.state.success === true) ? (
          <div class="alert alert-success" role="alert">Your Pin Was Successfully Updated!</div>
        ) : (
          <div></div>
        )}
        <input
          type='text'
          name='name'
          value={name}
          onChange={this.handleChange}
          placeholder='Pin Name'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          type='text'
          name='description'
          value={description}
          onChange={this.handleChange}
          placeholder='Pin Description'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          type='url'
          name='url'
          value={url}
          onChange={this.handleChange}
          placeholder='Web Address'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          type='url'
          name='imageUrl'
          value={imageUrl}
          onChange={this.handleChange}
          placeholder='Enter an image URL or upload a file'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          className='m-2'
          type='file'
          id='myFile'
          name='filename'
          accept='image/*'
          onChange={this.handleChange}
        />
        <p>Set Pin Visibility</p>
        <select
          name='private'
          className='form-control form-control-md'
          value={this.state.private}
          onChange={this.handleChange} >
            <option value={'true'}>Private</option>
            <option value={'false'}>Public</option>
        </select>
        <p className='mt-2'>Select A Board</p>
        <select ref={this.boardsRef} className='form-control form-control-md mb-2'>
            {Object.keys(boards).length && boards.map((board) => (
              <option key={board.firebaseKey} value={board.firebaseKey}>{board.name}</option>
            ))}
        </select>
        <button className='btn btn-success'>Submit</button>
      </form>
    );
  }
}
