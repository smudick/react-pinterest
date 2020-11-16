import axios from 'axios';

const baseUrl = 'https://pinterest-2c944.firebaseio.com/';

const getUserBoards = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/boards.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
      resolve(Object.values(response.data));
    })
    .catch((error) => reject(error));
});

export default getUserBoards;
