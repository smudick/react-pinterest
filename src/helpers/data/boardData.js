/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const baseUrl = 'https://pinterest-2c944.firebaseio.com/';

const getAllUserBoards = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/boards.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
      resolve(Object.values(response.data));
    })
    .catch((error) => reject(error));
});

const getSingleBoard = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/boards/${firebaseKey}.json`).then((response) => {
      resolve(response.data);
    });
});

const createBoard = (boardObj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}/boards.json`, boardObj)
    .then((response) => {
      axios.patch(`${baseUrl}/boards/${response.data.name}.json`, { firebaseKey: response.data.name })
        .then((patchResponse) => {
          resolve(patchResponse);
        }).catch((error) => reject(error));
    });
});

const updateBoard = (boardObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseUrl}/boards/${boardObj.firebaseKey}.json`, boardObj)
    .then((response) => {
      resolve(response);
    }).catch((error) => reject(error));
});

const createPinBoard = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}/pin-boards.json`, obj).then((response) => {
      axios.patch(`${baseUrl}/pin-boards/${response.data.name}.json`, { firebaseKey: response.data.name })
        .then((patchResponse) => {
          resolve(patchResponse);
        }).catch((error) => reject(error));
    });
});

const deleteBoard = (boardFirebaseKey) => axios.delete(`${baseUrl}/boards/${boardFirebaseKey}.json`)
  .then(() => {
    axios.get(`${baseUrl}/pin-boards.json?orderBy="boardId"&equalTo="${boardFirebaseKey}"`)
      .then((response) => {
        const responseArray = Object.values(response);
        responseArray.forEach((respArr) => {
          const pinBoardIdsArray = Object.keys(respArr);
          pinBoardIdsArray.forEach((id) => {
            deletePinBoard(id);
          });
        });
      });
  });

const deletePinBoard = (id) => axios.delete(`${baseUrl}/pin-boards/${id}.json`);

export default {
  getAllUserBoards,
  getSingleBoard,
  createBoard,
  updateBoard,
  createPinBoard,
  deleteBoard,
  deletePinBoard,
};
