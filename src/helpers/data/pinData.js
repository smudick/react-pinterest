import axios from 'axios';
import boardData from './boardData';

const baseUrl = 'https://pinterest-2c944.firebaseio.com/';

const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pin-boards.json?orderBy="boardId"&equalTo="${boardId}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getPin = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins/${pinId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getAllUserPins = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/pins.json?orderBy="UserId"&equalTo="${uid}"`).then((response) => {
      resolve(Object.values(response.data));
    })
    .catch((error) => reject(error));
});

const createPin = (pinObj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}/pins.json`, pinObj)
    .then((response) => {
      axios.patch(`${baseUrl}/pins/${response.data.name}.json`, { firebaseKey: response.data.name }).then((patchResponse) => {
        resolve(patchResponse);
      }).catch((error) => reject(error));
    });
});

const getPublicPins = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="private"&equalTo=false`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`)
  .then(() => {
    axios.get(`${baseUrl}/pin-boards.json?orderBy="pinId"&equalTo="${pinId}"`)
      .then((response) => {
        const responseArray = Object.values(response);
        responseArray.forEach((respArr) => {
          const pinBoardIdsArray = Object.keys(respArr);
          pinBoardIdsArray.forEach((id) => {
            boardData.deletePinBoard(id);
          });
        });
      });
  });

export {
  getBoardPins,
  getPin,
  getAllUserPins,
  createPin,
  getPublicPins,
  deletePin,
};
