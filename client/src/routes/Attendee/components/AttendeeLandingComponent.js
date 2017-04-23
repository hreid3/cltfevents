/**
 * Created by hreid on 4/20/17.
 */
import React from 'react'
import AttendeeFormContainer from '../containers/AttendeeFormContainer'
import AttendeeSearchComponent from '../containers/AttendeeSearchContainer'

const AttendeeLandingComponent = (props) => {

  let defaultComponent = (<div> </div>)
  const {slug, action} = props.params

  if (!action) {
    if (props.params.slug) {
      console.log(props.params.slug)
      defaultComponent = <div></div> // Details
    } else {
      defaultComponent = <AttendeeSearchComponent {...props} />// Search View
    }
  } else {
    switch (action) {
      case 'create-new':
        if (slug == 'tool') {
          defaultComponent = <AttendeeFormContainer action={action} /> // Attendee Form
        }
        break
      case 'edit':
        defaultComponent = <AttendeeFormContainer action={action} _id={slug} /> // Attendee Form
        break
    }
  }
  // props.initialize()
  return (
    defaultComponent
  )

}

export default AttendeeLandingComponent
