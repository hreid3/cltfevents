/**
 * Created by hreid on 4/23/17.
 */

import React, {Component, PropTypes} from 'react'

const AddressRenderer = (props) => {

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
      <div className="col-12">
        <h4>{props.label}</h4>
        <div>{props.title}</div>
        <div>
          {Street}
        </div>
        <div>
          {City}, {State} &nbsp; {Postal}
        </div>
      </div>
    </div>
  )
}

AddressRenderer.defaultProps = {
  label: "Address",
}

AddressRenderer.propTypes = {
  location: React.PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
}

export default AddressRenderer
