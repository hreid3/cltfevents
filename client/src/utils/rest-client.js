/**
 * Created by hreid on 4/10/17.
 */

import fetch from 'isomorphic-fetch'

export const EVENT_API_ENDPOINT_BASE = '/api/events/v1'

export const defaultHeaders = new Headers({
  'Content-Type': 'application/json',
})

export const doGet = (uri) => {
  const options = {
    method: 'GET',
    headers: defaultHeaders,
    mode: 'cors',
    cache: 'default'
  }
  const request = new Request(`${EVENT_API_ENDPOINT_BASE}${uri}`, options)
  return fetch(request)
    .then(response =>  {
      // In case we want to do something with the response.
      return response.json()
    })
    .catch((error) => {
      console.error('error', uri, error)
    })
}

export const doPost = (uri, body) => {
  const options = {
    method: 'POST',
    headers: defaultHeaders,
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify(body)
  }
  const request = new Request(`${EVENT_API_ENDPOINT_BASE}${uri}`, options)
  return fetch(request)
    .then(response =>  {
      if (!response.ok) {
        console.error('notOk', response)
        throw Error(response.statusText)
      }
      // In case we want to do something with the response.
      return response.json()
    })
    .catch((error) => {
      console.error('error', uri, error)
      return new Promise(error)
    })
}


/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {Promise}           The request promise
 */
export function request(url, options) {
  return new Promise((resolve, reject) => {
    fetch(EVENT_API_ENDPOINT_BASE  + url, options)
      .then(parseJSON)
      .then((response) => {
        if (response.ok) {
          return resolve(response.json);
        }
        // extract the error from the server's json
        return reject(response.json.reason.errors);
      })
      .catch((error) => reject({
        networkError: error.message,
      }));
  });
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON, status from the response
 */
function parseJSON(response) {
  return new Promise((resolve) => response.json()
    .then((json) => resolve({
      status: response.status,
      ok: response.ok,
      json,
    })));
}

