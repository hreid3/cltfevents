/**
 * Created by hreid on 4/17/17.
 */
import React, {Component} from 'react'
// import { Classes} from "@blueprintjs/core";
import DocumentTitle from 'react-document-title'
import ReactHtmlParser from 'react-html-parser'
import {Link} from 'react-router'

export class EventDetailsComponent extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadEventDetailsData(this.props.params.slug)
  }

  render() {
    const {
      title,
      description,
      hostingChurch,
      startDateTime,
      numberOfSeats,
      ticketPrice,
      guestSpeakers,
      eventStatus,
      eventType,
      eventLevel,
      notes
    } = this.props.details

    if (title == '') {
      return (
        <div></div>
      )
    }

    if (Array.isArray(hostingChurch.location)) {
      hostingChurch.location = hostingChurch.location[0]
    } else {
      hostingChurch.location = {state: {}}
    }

    const hostingChurchLabel = hostingChurch.title ? hostingChurch.title : ''
    const hostingChurchStreet = hostingChurch.location.street ? hostingChurch.location.street : ''
    const hostingChurchState = hostingChurch.location.state.title ? hostingChurch.location.state.title : ''
    const hostingChurchCity = hostingChurch.location.city ? hostingChurch.location.city : ''
    const hostingChurchPostal = hostingChurch.location.postal ? hostingChurch.location.postal : ''
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

            <div className="row">
              <div className="col-12">
                <h4>Hosting Church</h4>
                <div>{hostingChurchLabel}</div>
                <div>
                  {hostingChurchStreet}
                </div>
                <div>
                  {hostingChurchCity}, {hostingChurchState} &nbsp; {hostingChurchPostal}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
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

      </div>
    )
  }
}
