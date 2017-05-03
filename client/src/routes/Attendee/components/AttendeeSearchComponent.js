/**
 * Created by hreid on 4/20/17.
 */
import React, {Component} from 'react'
import {Link} from 'react-router'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import './attendee.scss'

class AttendeeSearchComponent extends Component {

  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.onSearchChange('')
  }

  actionCell = (cell, row) => {
    // return <div>Button</div>
    return (<button className="btn btn-success btn-sm" onClick={() => this.props.deleteAttendee(row._id, row.firstName + ' ' + row.lastName)}>Delete</button>)
  }

  render() {
    const props = this.props
    return (
      <div>
        <Link className="btn btn-warning" tabIndex="0" to="/attendee/tool/create-new" role="button">Add
          Attendee</Link>
        <BootstrapTable
          data={props.grid.results}
          remote={true }
          search={ true }
          multiColumnSearch={ true }
          options={ {onSearchChange: props.onSearchChange, clearSearch: true, searchDelayTime: 750} }
          pagination={true}>
          <TableHeaderColumn hidden={true} dataField='_id' isKey={true}>Attribute ID</TableHeaderColumn>
          <TableHeaderColumn dataField="firstName"
                             dataFormat={(cell, row) => <Link to={"/attendee/" + row._id + "/edit"}>{cell}</Link>}>First
            Name</TableHeaderColumn>
          <TableHeaderColumn dataField="lastName">Last Name</TableHeaderColumn>
          <TableHeaderColumn dataField="email">Email</TableHeaderColumn>
          <TableHeaderColumn dataFormat={this.actionCell}></TableHeaderColumn>
        </BootstrapTable>

      </div>
    )
  }
}

export default AttendeeSearchComponent
