/**
 * Created by hreid on 4/20/17.
 */
import React from 'react'
import {Link} from 'react-router'

const AttendeeSearchComponent = props => {
  return (
    <Link className="pt-button pt-icon-th" tabIndex="0" to="/attendee/tool/create-new" role="button">Add Attendee</Link>
  )
}

export default AttendeeSearchComponent
