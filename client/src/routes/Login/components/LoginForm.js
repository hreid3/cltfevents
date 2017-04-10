import React from 'react'
import { Field} from 'redux-form'
import {textField} from '../../../components/ReduxFormRenderedFields'
import DocumentTitle from 'react-document-title'

const LoginForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <DocumentTitle title="Login">
        <h1>Welcome to Events</h1>
      </DocumentTitle>
      <Field name="username" type="text" component={textField} label="Username" placeholder="Please enter username" id="username"/>
      <Field name="password" type="password" component={textField} label="Password"  placeholder="Please enter password" id="password"/>
      <div>
        <button type="submit" disabled={submitting} className="pt-button pt-intent-primary">Submit <span className="pt-icon-standard pt-icon-arrow-right pt-align-right"></span></button>
      </div>
    </form>
  )
}
export default LoginForm
