/**
 * Created by hreid on 4/17/17.
 */
import React, {Component} from 'react'
// import { Classes} from "@blueprintjs/core";
import DocumentTitle from 'react-document-title'
import ReactHtmlParser from 'react-html-parser'
import {Link} from 'react-router'
import AddressRenderer from '../../../components/Shared/AddressRenderer'
import { Classes, Tab2 as Tab, Tabs2 as Tabs } from "@blueprintjs/core";
import EventAttendeesComponent from '../containers/EventAttendeesContainer'

export class EventDetailsComponent extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadEventDetailsData(this.props.params.slug)
  }

  render() {
    const {deleteEvent} = this.props
    const {
      title,
      slug,
      description,
      hostingChurch,
      startDateTime,
      numberOfSeats,
      ticketPrice,
      guestSpeakers,
      eventStatus,
      eventType,
      eventLevel,
      notes,
      location,
      attendees
    } = this.props.details
    if (title == '') {
      return (
        <div></div>
      )
    }
    return (
      <div>
        <div className="row">
          <DocumentTitle title="Event Details">
            <div className="col-12">
              <h1>Event Details</h1>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/events">Events</Link></li>
                <li className="breadcrumb-item active">{title}</li>
              </ol>
            </div>
          </DocumentTitle>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="pt-button-group pt-large float-right">
              <Link className="pt-button pt-icon-th" tabIndex="0" to={`/events/${this.props.params.slug}/edit`} role="button">Edit Event</Link>
              <a className="pt-button pt-icon-th" tabIndex="1" onClick={() => deleteEvent(slug, title)} role="button">Delete Event</a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-12">
                <h2>{title}</h2>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                {/*<h4>Description</h4>*/}
                <div>{ReactHtmlParser( description )}</div>
              </div>
            </div>
            <AddressRenderer location={hostingChurch.location} title={hostingChurch.title} label="Hosting Church"/>
          </div>
          <div className="col-md-4">
            <AddressRenderer location={location} title={location.title} label="Event Location" />
            <div className="row">
              <div className="col-12">
                <h4>Start Time</h4>
                <div>{startDateTime}</div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <h4>Number of Seats / Tickets</h4>
                <div>{numberOfSeats}</div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <h4>Ticket Price</h4>
                <div>{ticketPrice}</div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <h4>Guest Speakers</h4>
                <div>{guestSpeakers ? guestSpeakers.map((val) => val.value) : ""} </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <h4>Status</h4>
                <div>{eventStatus.title}</div>
              </div>
            </div>


            <div className="row">
              <div className="col-12">
                <h4>Type</h4>
                <div>{eventType.title}</div>
              </div>
            </div>


            <div className="row">
              <div className="col-12">
                <h4>Level</h4>
                <div>{eventLevel.title}</div>
              </div>
            </div>

          </div>
        </div>
      <hr/>
      <EventAttendeesComponent  />
      </div>
    )
  }
}

