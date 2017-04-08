/**
 * Created by hreid on 4/7/17.
 */
import React, { Component, PropTypes } from 'react'
import {Form, Text} from 'react-form'
import DocumentTitle from 'react-document-title'

export const LoginComponent = (props) => (
  <div>
    <DocumentTitle title='Home'>
      <h1>Logon to the site</h1>
    </DocumentTitle>
    <Form
      onSubmit={values => props.doLogin(values.username, values.password)}
      validate={values => validateLogin(values)}
      defaultValues={{
        username: props.user.username
      }}
      >
      {({submitForm}) => {
        return (
          <form onSubmit={submitForm}>
            <div>
              <label htmlFor="username" className="formLabel">Username</label>
              <Text
                field='username'
                label="Username"
                placeholder="Please enter your username."
                id="username"
                />
            </div>
            <div>
              <label htmlFor="password" className="formLabel">Password</label>
              <Text
                field='password'
                label="Password"
                type="password"
                placeholder="Please enter your password."
                id="password"
              />
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        )
      }}
    </Form>
  </div>
)

export const validateLogin = (values) => {
  const {username, password} = values
  return {
    username: !username ? 'A username is required' : undefined,
    password: !password ? 'A password is required' : undefined,
  }
}

export default LoginComponent
