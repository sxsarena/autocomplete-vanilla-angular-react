/**
 * Request to the json type using XMLHttpRequest
 *
 * @param {string} url - address for the request
 * @param {function} successHandler - for success in the request
 * @param {function} errorHandler - for failed requests
 *
 */
export default function makeRequest(url, successHandler, errorHandler) {
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.open('GET', url, true);
  xmlhttp.responseType = 'json';

  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === xmlhttp.DONE) {
      if (xmlhttp.status === 200) {
        successHandler && successHandler(xmlhttp.response);
      } else {
        errorHandler && errorHandler(xmlhttp.status);
      }
    }
  };

  xmlhttp.send();
}
