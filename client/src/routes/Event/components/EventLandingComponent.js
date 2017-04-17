import React, {Component} from 'react'
import { Classes, Tab2 as Tab, Tabs2 as Tabs } from "@blueprintjs/core";
import DocumentTitle from 'react-document-title'
import EventForm from './EventFormComponent'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

const EventLanding = (props) => {
  return (
    <div>
      <DocumentTitle title="Login">
        <h1>Events</h1>
      </DocumentTitle>
      <Tabs
        animate={true}
        className={Classes.LARGE}
        id="eventsTabbedPane"
        onChange={handleEventsTabbedPaneChange} // TODO: Replace with store
        selectedTabId={props.selectedTabId} // TODO: Replace with store
        renderActiveTabPanelOnly={true}
        >
        <Tab id="eventsGrid" title="Events" panel={<EventsGrid {...props} />} />
        <Tab id="eventsDetails" title="Event Details" panel={<EventForm {...props} />} />
      </Tabs>
    </div>
  )
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
        <h2>Events Grid</h2>
        <div className="row">
          <div className="col-12">
            <div className="pt-button-group pt-large float-right">
              <a className="pt-button pt-icon-th" tabIndex="0" role="button" onClick={props.addEvent}>Add Event</a>
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
