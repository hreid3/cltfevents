import React from 'react'
import { Field } from 'redux-form'
import {textField} from '../../../components/ReduxFormRenderFields'

export const EventForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="title" type="text" component={textField} label="Event Title" placeholder="Fellowship of Praise" id="title"/>
      <div>
        <button type="submit" disabled={submitting} className="pt-button pt-intent-primary">Submit <span className="pt-icon-standard pt-icon-arrow-right pt-align-right"></span></button>
      </div>
    </form>
  )
}

EventForm.propTypes = {
}

export default EventForm
