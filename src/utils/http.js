

/**
 *
 * @param {String} url
 * @returns {Promise} response
 */
export const GET = ({url}) => {
  const config = {
    url: url,
    method: 'GET',
  };

  return new Promise((resolve, reject) => {
    fetch(url, config).then(
      function(response) {
        resolve(response.json());
      },
      function(error) {
        reject(error);
      });
  });
};


export const POST = ( {url, body} ) => {

  const config = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(body),
    mode: 'cors',
    cache: 'default',
  };
  return new Promise((resolve, reject) => {
    fetch(url, config).then(
      function(response) {
        resolve(response.json());
      },
      function(error) {
        reject(error);
      });
  });
};


export const PUT = ( {url, body} ) => {

  const config = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(body),
    mode: 'cors',
    cache: 'default',
  };
  return new Promise((resolve, reject) => {
    fetch(url, config).then(
      function(response) {
        resolve(response.json());
      },
      function(error) {
        reject(error);
      });
  });
};

/**
 * This method returns the request parameters of the URL
 * @param {String}name
 * @param {String}url
 * @return {String}decodeURIComponent
 */
export const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};