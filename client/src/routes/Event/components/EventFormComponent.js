import React, {Component} from 'react'
import { Field } from 'redux-form'
import {textField, wysiwygEditorField, selectField} from '../../../components/ReduxFormRenderedFields'


class EventForm extends Component {

  constructor(props) {
    super(props)
  }

  render({props} = this) {
    const { handleSubmit, pristine, reset, submitting, lookupData } = props
    return (
      <form onSubmit={handleSubmit}>
        <Field name="details.title" type="text" component={textField} label="Event Title" placeholder="Fellowship of Praise" id="title" />
        <Field name="details.hostingChurch.id" type="text" component={selectField}  placeholder="Please select the hosting church" label="Hosting Church" options={lookupData.hostingChurches}/>
        <Field name="details.description" type="text" component={wysiwygEditorField} label="Event Description" value={props.details.description} />
        <div>
          <button type="submit" disabled={submitting} className="pt-button pt-intent-primary">Submit <span className="pt-icon-standard pt-icon-arrow-right pt-align-right"></span></button>
        </div>
      </form>
    )
  }
}
// export const EventForm = (props) => {
//   const { handleSubmit, pristine, reset, submitting } = props
// }
//
// EventForm.propTypes = {
// }

export default EventForm
