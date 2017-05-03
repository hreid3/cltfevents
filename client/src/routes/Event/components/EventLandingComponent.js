import React, {Component} from 'react'
import {Link} from 'react-router'
import { Classes, Tab2 as Tab, Tabs2 as Tabs } from "@blueprintjs/core";
import DocumentTitle from 'react-document-title'
import EventForm from './EventFormComponent'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import {EventDetailsComponent} from './EventDetailsComponent'
import moment from 'moment'

const EventLanding = (props) => {
  let defaultComponent = (<div></div>)

  const {slug, action} = props.params
  if (!action) {
    if (props.params.slug) {
      defaultComponent = <EventDetailsComponent {...props} />
    } else {
      defaultComponent = <EventsGrid {...props} />
    }
  } else {
    switch(action) {
      case 'create-new':
        if (slug === 'tool') {
          defaultComponent = <EventForm  {...props} />
        }
        break
      case 'edit':
        defaultComponent = <EventForm {...props} />
    }
  }
  return defaultComponent
}

class EventsGrid extends Component { // Need lifecycle method

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadEventData()
  }

  actionCell = (cell, row) => {
    return (<button onClick={() => this.props.deleteEvent(row.slug, row.title)}>Delete</button>)
  }

  eventLocation = (cell, row) => {
    if (Array.isArray(cell)) {
      cell = cell[0]
    }
    return  (
      <div className="event-location">
        <div>{cell.label}</div>
        <div>{cell.street}</div>
        <div>{cell.city}, {cell.state.id}  {cell.postal}</div>
      </div>
    )
  }
  render() {
    const props = this.props
    return (
      <div className="eventGridSection">
        <DocumentTitle title="Login">
          <div className="">
          <h1>Events</h1>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active">Events Summary</li>
            </ol>
          </div>
        </DocumentTitle>
        <div className="">
          <div className="">
            <div className="pt-button-group pt-large float-right">
              {/*<button onClick={props.showModal}>Popup</button>*/}
              <Link className="btn btn-warning" tabIndex="0" to="/events/tool/create-new" role="button">Add Event</Link>
            </div>
          </div>
        </div>
        <div className="">
          <div className="">
            <BootstrapTable
              data={props.grid.results}
              remote={false}
              pagination={true}>
              <TableHeaderColumn
                dataField='_id'
                isKey={true}
                width="20%"
                hidden={true}>Event ID</TableHeaderColumn>
              <TableHeaderColumn
                dataField="title"
                dataSort
                dataFormat={(cell, row) => <Link to={"/events/" + row.slug}>{cell}</Link>}>Event Title</TableHeaderColumn>
              <TableHeaderColumn
                dataField="hostingChurch"
                dataSort
                dataFormat={(cell) => cell.title}>Hosting Church</TableHeaderColumn>
              <TableHeaderColumn
                dataField="startDateTime"
                width="15%"
                dataSort
                dataFormat={cell => moment(cell).format('MMM Do, YYYY h:mm a')}>Event Date</TableHeaderColumn>
              {/*<TableHeaderColumn*/}
                {/*dataField="registeredUsers"*/}
                {/*dataSort*/}
                {/*width="8%"*/}
              {/*>Booked Attendees</TableHeaderColumn>*/}
              <TableHeaderColumn
                dataField="eventStatus"
                width="8%"
                dataSort
                dataFormat={cell => cell.title}
              >Status</TableHeaderColumn>
              <TableHeaderColumn
                dataField="location"
                width="20%"
                dataFormat={this.eventLocation}
              >Location</TableHeaderColumn>
              <TableHeaderColumn
                width="8%"
                dataFormat={this.actionCell}></TableHeaderColumn>
            </BootstrapTable>
          </div>
        </div>
      </div>
    )
  }
}

export default EventLanding

// options={ { onSortChange: props.onSortChange} }
