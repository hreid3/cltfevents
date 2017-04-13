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
      console.log('error', uri, error)
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
      // In case we want to do something with the response.
      return response.json()
    })
    .catch((error) => {
      console.log('error', uri, error)
    })
}
