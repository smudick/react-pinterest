import axios from 'axios';

const baseUrl = 'https://pinterest-2c944.firebaseio.com/';

const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="boardId"&equalTo="${boardId}"`).then((response) => {
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

export {
  getBoardPins,
  getPin,
  getAllUserPins,
  createPin,
};
