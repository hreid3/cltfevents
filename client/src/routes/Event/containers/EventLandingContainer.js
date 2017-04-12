import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { addEvent, doSubmitEventForm } from '../modules/event'

import EventLanding from '../components/EventLandingComponent'

export const validate = values => {
  const { details } = values
  console.log("validate", details);
  const errors = {}

  return errors
}

const mapDispatchToProps = (dispatch) => {
  return {
    addEvent: () => dispatch(addEvent()),
    onSubmit: (values) => dispatch(doSubmitEventForm(values)),
    validate: validate
  }
}

const mapStateToProps = (state) => {
  const ret = Object.assign({},
    state.eventData,
    {initialValues: state.eventData})
  return ret
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'eventForm'})(EventLanding))
