import React from 'react'
import { Classes, Tab2 as Tab, Tabs2 as Tabs } from "@blueprintjs/core";
import DocumentTitle from 'react-document-title'
import EventForm from './EventFormComponent'

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

const EventsGrid = (props) => {
  return (
    <div><h2>Events Grid</h2>
      <div className="pt-button-group pt-large">
        <a className="pt-button pt-icon-th" tabIndex="0" role="button" onClick={props.addEvent}>Add Event</a> //TODO: Need connection from store
      </div>
    </div>
  )
}

export default EventLanding
