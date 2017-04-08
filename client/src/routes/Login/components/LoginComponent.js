/**
 * Created by hreid on 4/7/17.
 */
import React, { Component, PropTypes } from 'react'
import {Form, Text} from 'react-form'

export const LoginComponent = (props) => (
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
          <Text
            field='username'
            label="Username"
            placeholder="Please enter your username."
            />
          <Text
            field='password'
            label="Password"
            type="password"
            placeholder="Please enter your password."
          />
          <button type="submit">Submit</button>
        </form>
      )
    }}
  </Form>
)

const validateLogin = (values) => {
  const {username, password} = values
  return {
    username: !username ? 'A username is required' : undefined,
    password: !password ? 'A password is required' : undefined,
  }
}

export default LoginComponent
