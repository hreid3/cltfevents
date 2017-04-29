import React, {Component} from 'react'
import { Field } from 'redux-form'
import {
  textField,
  wysiwygEditorField,
  selectField,
  selectTagField,
  datetimePickerField,
  numberTextField
} from '../../../components/ReduxFormRenderedFields'
import DocumentTitle from 'react-document-title'
import './event-form.scss'
import {Link} from 'react-router'

export default class EventForm extends Component  {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.params.action === 'create-new') {
      this.props.addEvent()
    } else if (this.props.params.action === 'edit') {
      this.props.editEvent(this.props.params.slug)
    }
  }

  render() {
    const {selectedTabId, handleSubmit, pristine, reset, submitting, lookupData, details} = this.props
    if (selectedTabId != 'eventsDetails') {
      return (<div></div>)
    }
    let breadcrumb = (
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        <li className="breadcrumb-item"><Link to="/events">Events</Link></li>
        <li className="breadcrumb-item active">New Event</li>
      </ol>
    )
    if (this.props.params.action === 'edit') {
      breadcrumb = (
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/events">Events</Link></li>
          <li className="breadcrumb-item"><Link to={"/events/" + this.props.params.slug}>{details.title}</Link></li>
          <li className="breadcrumb-item active">Edit</li>
        </ol>
      )
    }

    // console.log('eventForm',this.props)

    if (details.location && Array.isArray(details.location)) {
      details.location = details.location[0]
    }
    return (
      <div>
        <DocumentTitle title="New Event">
          <div className="row">
            <div className="col-md-12">
              <h1>Events Form</h1>
              {breadcrumb}
            </div>
          </div>
        </DocumentTitle>
        <form onSubmit={handleSubmit} className="event-form">
          <div className="row">
            <div className="col-md-8 ">
              <Field name="details.title" type="text" component={textField} label="Event Title"
                     placeholder="Fellowship of Praise" id="title" autoFocus={true}/>
              <Field name="details.hostingChurch" type="text" component={selectField}
                     placeholder="Please select the hosting church" label="Hosting Church"
                     options={lookupData.hostingChurches}/>
              <Field name="details.description" type="text" component={wysiwygEditorField} label="Event Description"
                     value={details.description}/>
              <hr/>
              <div className="row">
                <div className="col-md-12">
                  <Field name="details.location.label" type="text" component={textField}
                         placeholder="Please enter Location Label" label="Event Location" id="location.label"/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Field name="details.location.street" type="text" component={textField}
                         placeholder="E.g. 14 Tammy Drive" label="Street Address" id="location.street"/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Field name="details.location.city" type="text" component={textField} placeholder="E.g. Middletown"
                         label="City" id="location.city"/>
                </div>
                <div className="col-md-3">
                  <Field name="details.location.state" type="text" component={selectField} placeholder="Select a state"
                         label="State" options={lookupData.states}/>
                </div>
                <div className="col-md-3">
                  <Field name="details.location.postal" type="text" component={textField} placeholder="12345"
                         label="Zipcode" id="location.postal"/>
                </div>
              </div>
              <hr/>
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-12">
                  <Field name="details.numberOfSeats" component={numberTextField} label="Number of Seats"
                         placeholder="0" id="numberOfSeats" min="0" max="999999" step="1" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Field name="details.ticketPrice" component={numberTextField} label="Ticket Price"
                         placeholder="0.00" id="ticketPrice" min="0" max="999" step=".01" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Field name="details.guestSpeakers" type="text" component={selectTagField} label="Guest Speakers"
                         placeholder="Please enter a guest speaker name" options={lookupData.guestSpeakers}/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Field name="details.startDateTime" type="text" component={datetimePickerField}
                         label="Event Start Date" placeholder=""/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Field name="details.eventStatus" type="text" component={selectField} placeholder="Status"
                         label="Status" options={lookupData.statuses}/>
                </div>
                <div className="col-lg-6 col-md-12">
                  <Field name="details.eventType" type="text" component={selectField} placeholder="Type" label="Type"
                         options={lookupData.types}/>
                </div>
                <div className="col-lg-6 col-md-12">
                  <Field name="details.eventLevel" type="text" component={selectField} placeholder="Level" label="Level"
                         options={lookupData.levels}/>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              <hr/>
              <div>
                <button type="submit" disabled={submitting} className="btn btn-warning">Submit <span
                  className="pt-icon-standard pt-icon-arrow-right pt-align-right"></span></button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

