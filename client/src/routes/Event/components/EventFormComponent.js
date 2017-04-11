import React, {Component} from 'react'
import { Field } from 'redux-form'
import {textField, wysiwygEditorField, selectField, selectTagField} from '../../../components/ReduxFormRenderedFields'

export const EventForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, lookupData } = props
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-8 ">
          <Field name="details.title" type="text" component={textField} label="Event Title" placeholder="Fellowship of Praise" id="title" />
          <Field name="details.hostingChurch.id" type="text" component={selectField}  placeholder="Please select the hosting church" label="Hosting Church" options={lookupData.hostingChurches}/>
          <Field name="details.description" type="text" component={wysiwygEditorField} label="Event Description" value={props.details.description} />
          <hr/>
          <div className="row">
            <div className="col">
              <Field name="details.location.label" type="text" component={textField}  placeholder="Please enter Location Label" label="Event Location" id="location.label" />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Field name="details.location.street" type="text" component={textField}  placeholder="E.g. 14 Tammy Drive" label="Street Address" id="location.street" />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Field name="details.location.city" type="text" component={textField}  placeholder="E.g. Middletown" label="City" id="location.city" />
            </div>
            <div className="col">
              <Field name="details.location.postal" type="text" component={textField}  placeholder="12345" label="Zipcode" id="location.postal" />
            </div>
          </div>
          <hr/>
        </div>
        <div className="col-md-4">
          <div className="row">
            <div className="col">
              <Field name="details.numberOfSeats" type="text" component={textField} label="Number of Seats" placeholder="0" id="numberOfSeats" />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Field name="details.titlePrice" type="text" component={textField} label="Ticket Price" placeholder="0.00" id="titlePrice" />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Field name="details.guestSpeakers" type="text" component={selectTagField} label="Guest Speakers" placeholder="Please enter a guest speaker name" options={lookupData.guestSpeakers} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <hr/>
          <div>
            <button type="submit" disabled={submitting} className="pt-button pt-intent-primary">Submit <span className="pt-icon-standard pt-icon-arrow-right pt-align-right"></span></button>
          </div>
        </div>
      </div>
    </form>
  )
}

// export const EventForm = (props) => {
//   const { handleSubmit, pristine, reset, submitting } = props
// }
//
// EventForm.propTypes = {
// }

export default EventForm
