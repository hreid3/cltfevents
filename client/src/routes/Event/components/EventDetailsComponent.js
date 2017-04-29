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
            <div className="col-md-12">
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
              <Link className="btn btn-warning" tabIndex="0" to={`/events/${this.props.params.slug}/edit`} role="button">Edit Event</Link>&nbsp;
              <a className="btn btn-warning" tabIndex="1" onClick={() => deleteEvent(slug, title)} role="button">Delete Event</a>
            </div>
          </div>
        </div>
        <div className="row">
          <section className="col-md-8 main">
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
            <div className="row">
              <div className="col-md-12">
                <div className=" panel panel-primary">
                  <div className="panel-heading">Guest Speakers</div>
                  <div className="panel-body">{guestSpeakers ? guestSpeakers.map((val) => val.value) : ""} </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className=" panel panel-primary">
                  <div className="panel-heading">Ticket Price</div>
                  <div className="panel-body">{currencyFormatterUs.format(ticketPrice)}</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className=" panel panel-primary">
                  <div className="panel-heading">Event Cost</div>
                  <div className="panel-body">{currencyFormatterUs.format(ticketPrice * numberOfSeats)}</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className=" panel panel-primary">
                  <div className="panel-heading"># Seats / Tickets</div>
                  <div className="panel-body">{numberOfSeats}</div>
                </div>
              </div>
            </div>
          </section>
          <aside className="col-md-4 right">
            <AddressRenderer location={location} title={location.title} label="Event Location" />
            <div className="row">
              <div className="col-md-12">
                <div className=" panel panel-primary">
                  <div className="panel-heading">Start Time</div>
                  <div className="panel-body">{moment(startDateTime).format('MMM Do, YYYY h:mm a')}</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className=" panel panel-primary">
                  <div className="panel-heading">Status</div>
                  <div className="panel-body">{eventStatus.title}</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className=" panel panel-primary">
                  <div className="panel-heading">Type</div>
                  <div className="panel-body">{eventType.title}</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className=" panel panel-primary">
                  <div className="panel-heading">Level</div>
                  <div className="panel-body">{eventLevel.title}</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className=" panel panel-success">
                  <div className="panel-heading">Funds Collected</div>
                  <div className="panel-body">{currencyFormatterUs.format(ticketPurchased)}</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className=" panel panel-success">
                  <div  className="panel-heading">Reserved Tickets</div>
                  <div className="panel-body">{reservedTickets}</div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className=" panel panel-success">
                  <div className="panel-heading">Remaining Seats / Tickets</div>
                  <div className="panel-body">{remainingTickets}</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className=" panel panel-success">
                  <div className="panel-heading">Attendees Registered</div>
                  <div className="panel-body">{numberOfAttendees}</div>
                </div>
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

