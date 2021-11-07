const getData = (onSuccess, onFail) => {

  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.text}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onFail(err);
    });
};

const sendData = (onSuccess, onFail, body) => {

  fetch('https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error(`${response.status} ${response.statusText} Не удалось отправить форму. Попробуйте ещё раз`);
      }
    })
    .catch((err) => {
      onFail(err);
    });
};

export {getData, sendData};
