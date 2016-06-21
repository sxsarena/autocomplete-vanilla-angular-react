/**
 * Request to the json type using XMLHttpRequest
 *
 * @param {string} url
 * @param {function} successHandler
 * @param {function} errorHandler
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
