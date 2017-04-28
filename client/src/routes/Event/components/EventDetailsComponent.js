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
import moment from 'moment'
import { currencyFormatterUs } from '../../../utils/common'

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
      attendees,
      remainingTickets,
      ticketPurchased,
      numberOfAttendees,
      reservedTickets,
    } = this.props.details
    if (title == '') {
      return (
        <div></div>
      )
    }
    return (
      <div className="event-details-component">
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
          <div className="col-md-8">
            <div className="pt-button-group pt-large float-left">
              <Link className="pt-button pt-icon-th" tabIndex="0" to={`/events/${this.props.params.slug}/edit`} role="button">Edit Event</Link>
              <a className="pt-button pt-icon-th" tabIndex="1" onClick={() => deleteEvent(slug, title)} role="button">Delete Event</a>
            </div>
          </div>
        </div>
        <div className="row">
          <section className="col-md-7 main">
            <div className="row">
              <div className="col-md-12">
                <h2>{title}</h2>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                {/*<h4>Description</h4>*/}
                <div>{ReactHtmlParser( description )}</div>
              </div>
            </div>
            <AddressRenderer location={hostingChurch.location} title={hostingChurch.title} label="Hosting Church"/>
          </section>
          <aside className="col-md-5 right">
            <AddressRenderer location={location} title={location.title} label="Event Location" />
            <div className="row">
              <div className="col-md-8">
                <h4>Start Time</h4>
                <div>{moment(startDateTime).format('MMM Do, YYYY h:mm a')}</div>
              </div>
              <div className="col-md-4">
                <h4># Seats / Tickets</h4>
                <div>{numberOfSeats}</div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <h4>Reserved Tickets</h4>
                <div>{reservedTickets}</div>
              </div>
              <div className="col-md-4">
                <h4>Remaining Seats / Tickets</h4>
                <div>{remainingTickets}</div>
              </div>
              <div className="col-md-4">
                <h4>Attendees Registered</h4>
                <div>{numberOfAttendees}</div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <h4>Ticket Price</h4>
                <div>{currencyFormatterUs.format(ticketPrice)}</div>
              </div>
              <div className="col-md-4">
                <h4>Event Cost</h4>
                <div>{currencyFormatterUs.format(ticketPrice * numberOfSeats)}</div>
              </div>
              <div className="col-md-4">
                <h4>Funds Collected</h4>
                <div>{currencyFormatterUs.format(ticketPurchased)}</div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <h4>Guest Speakers</h4>
                <div>{guestSpeakers ? guestSpeakers.map((val) => val.value) : ""} </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <h4>Status</h4>
                <div>{eventStatus.title}</div>
              </div>
              <div className="col-md-4">
                <h4>Type</h4>
                <div>{eventType.title}</div>
              </div>
              <div className="col-md-4">
                <h4>Level</h4>
                <div>{eventLevel.title}</div>
              </div>
            </div>

          </aside>
        </div>
      <hr/>
      <EventAttendeesComponent  />
      </div>
    )
  }
}

