/**
 * Created by hreid on 4/24/17.
 */

import React, { Component } from 'react'
import { Link } from 'react-router'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import AttendeeBookingComponent from './AttendeeBookingComponent'
import { attendeeBooking } from '../modules/constants'

const attendInfoField = (cell, row) => <div>Attendee Info</div>

const attendeeBookingComponent = initialValues => (
  <AttendeeBookingComponent
    onSubmit={values => console.log("Hello World", values)}
    initialValues={{...initialValues}} />
)
const createTicketPurchasedEditor = (onUpdate, props) => (<TicketPurchasedEditor onUpdate={ onUpdate } {...props}/>);
const EventAttendeesComponent = props => {
  const slug = props.details.slug
  return (
    <div>
      <div className="pt-button-group pt-large float-right">
        <a className="pt-button pt-icon-th" onClick={(e) => props.openBookingForm(attendeeBookingComponent({...attendeeBooking, eventId: slug}))}>Add Attendee</a>
      </div>
      <BootstrapTable
        data={props.details.attendees}
        remote={true}
        search={true}
        multiColumnSearch={true}>
        <TableHeaderColumn dataField="attendeeId" isKey={true} >Attendee ID</TableHeaderColumn>
        <TableHeaderColumn dataField="eventId" >Event ID</TableHeaderColumn>
        <TableHeaderColumn dataFormat={attendInfoField} >Attendee</TableHeaderColumn>
        <TableHeaderColumn dataField="ticketPurchased">TicketPurchased</TableHeaderColumn>
        <TableHeaderColumn>TotalCost</TableHeaderColumn>
        <TableHeaderColumn dataField="bookingDate">Remaining Payments</TableHeaderColumn>
        <TableHeaderColumn hidden={true} dataField="">Actions</TableHeaderColumn>
      </BootstrapTable>
 </div>
  )
}
export default EventAttendeesComponent
