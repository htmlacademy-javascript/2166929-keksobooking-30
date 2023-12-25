const URL_GENERAL = 'https://30.javascript.pages.academy/keksobooking/';
const URL_FOR_GET_DATA = `${ URL_GENERAL }data`;

const createServerData = async (url, method, body) => {
  const response = await fetch(url, { method, body });
  if (!response.ok) {
    throw new Error();
  }
  return response.json();
};

const getServerData = async () => createServerData(URL_FOR_GET_DATA, 'GET');
const sendServerData = async (data) => createServerData(URL_GENERAL, 'POST', data);

export { getServerData, sendServerData };
