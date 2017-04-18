import React, {Component} from 'react'
import {Link} from 'react-router'
import { Classes, Tab2 as Tab, Tabs2 as Tabs } from "@blueprintjs/core";
import DocumentTitle from 'react-document-title'
import EventForm from './EventFormComponent'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import {EventDetailsComponent} from './EventDetailsComponent'

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
    }
  }
  return defaultComponent
}

// TODO: Replace dispatchFunctions
const handleEventsTabbedPaneChange = (navbarTabId) => {}

class EventsGrid extends Component { // Need lifecycle method

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadEventData()
  }

  render() {
    const props = this.props
    return (
      <div className="eventGridSection">
        <DocumentTitle title="Login">
          <h1>Events</h1>
        </DocumentTitle>
        <div className="row">
          <div className="col-12">
            <div className="pt-button-group pt-large float-right">
              <Link className="pt-button pt-icon-th" tabIndex="0" to="/events/tool/create-new" role="button">Add Event</Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <BootstrapTable
              data={props.grid.results}
              remote={true}
            >
              <TableHeaderColumn dataField='_id' isKey={true}>Event ID</TableHeaderColumn>
              <TableHeaderColumn dataField="title">Event Title</TableHeaderColumn>
              <TableHeaderColumn dataField="hostingChurch" dataFormat={(cell) => cell.title}>Hosting Church</TableHeaderColumn>
              <TableHeaderColumn dataField="startDateTime">Start Time</TableHeaderColumn>
            </BootstrapTable>
          </div>
        </div>
      </div>
    )
  }
}

export default EventLanding

// options={ { onSortChange: props.onSortChange} }
