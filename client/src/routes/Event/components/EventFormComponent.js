import React, {Component} from 'react'
import { Field } from 'redux-form'
import {
  textField,
  wysiwygEditorField,
  selectField,
  selectTagField,
  datetimePickerField
} from '../../../components/ReduxFormRenderedFields'
import './event-form.scss'

export const EventForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, lookupData } = props
  return (
    <form onSubmit={handleSubmit} className="event-form">
      <div className="row">
        <div className="col-md-8 ">
          <Field name="details.title" type="text" component={textField} label="Event Title" placeholder="Fellowship of Praise" id="title" />
          <Field name="details.hostingChurch" type="text" component={selectField}  placeholder="Please select the hosting church" label="Hosting Church" options={lookupData.hostingChurches}/>
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
          </div>
          <div className="row">
            <div className="col">
              <Field name="details.location.state" type="text" component={selectField}  placeholder="Select a state" label="State" options={lookupData.states}/>
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
              <Field name="details.ticketPrice" type="text" component={textField} label="Ticket Price" placeholder="0.00" id="ticketPrice" />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Field name="details.guestSpeakers" type="text" component={selectTagField} label="Guest Speakers" placeholder="Please enter a guest speaker name" options={lookupData.guestSpeakers} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Field name="details.startDateTime" type="text" component={datetimePickerField} label="Event Start Date" placeholder="" />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Field name="details.eventStatus" type="text" component={selectField}  placeholder="Status" label="Status" options={lookupData.statuses}/>
            </div>
            <div className="col-lg-6 col-md-12">
              <Field name="details.eventType" type="text" component={selectField}  placeholder="Type" label="Type" options={lookupData.types}/>
            </div>
            <div className="col-lg-6 col-md-12">
              <Field name="details.eventLevel" type="text" component={selectField}  placeholder="Level" label="Level" options={lookupData.levels}/>
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

export default EventForm
