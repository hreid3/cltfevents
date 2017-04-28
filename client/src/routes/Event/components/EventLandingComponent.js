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

  render() {
    const props = this.props
    return (
      <div className="eventGridSection">
        <DocumentTitle title="Login">
          <div className="col-12">
          <h1>Events</h1>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active">Events Summary</li>
            </ol>
          </div>
        </DocumentTitle>
        <div className="row">
          <div className="col-12">
            <div className="pt-button-group pt-large float-right">
              {/*<button onClick={props.showModal}>Popup</button>*/}
              <Link className="pt-button pt-icon-th" tabIndex="0" to="/events/tool/create-new" role="button">Add Event</Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <BootstrapTable
              data={props.grid.results}
              remote={false}>
              <TableHeaderColumn dataField='_id' isKey={true} hidden={true}>Event ID</TableHeaderColumn>
              <TableHeaderColumn dataField="title" dataFormat={(cell, row) => <Link to={"/events/" + row.slug}>{cell}</Link>}>Event Title</TableHeaderColumn>
              <TableHeaderColumn dataField="hostingChurch" dataFormat={(cell) => cell.title}>Hosting Church</TableHeaderColumn>
              <TableHeaderColumn dataField="startDateTime" dataFormat={cell => moment(cell).format('MMM Do, YYYY h:mm a')}>Start Time</TableHeaderColumn>
              <TableHeaderColumn dataFormat={this.actionCell}></TableHeaderColumn>
            </BootstrapTable>
          </div>
        </div>
      </div>
    )
  }
}

export default EventLanding

// options={ { onSortChange: props.onSortChange} }
