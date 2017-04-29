/**
 * Created by hreid on 4/23/17.
 */

import React, {Component, PropTypes} from 'react'

const AddressRenderer = (props) => {

  if (!props.location) return null

  let location = props.location
  if (Array.isArray(location)) {
    location = props.location[0]
  } else {
    location = {state: {}} // Meaning empty
  }

  const Title = location.label ? location.label : ''
  const Street = location.street ? location.street : ''
  const State = location.state.title ? location.state.title : ''
  const City = location.city ? location.city : ''
  const Postal = location.postal ? location.postal : ''

  return (
    <div className="row">
      <div className="col-md-12">
        <div className=" panel panel-primary">
          <div className="panel-heading">{props.label}</div>
          <div className="panel-body">
            <div>{props.title}</div>
            <div>
              {Street}
            </div>
            <div>
              {City}, {State} &nbsp; {Postal}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

AddressRenderer.defaultProps = {
  label: "Address",
  title: ''

}

export default AddressRenderer
