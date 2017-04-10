import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { addEvent } from '../modules/event'

import EventLanding from '../components/EventLandingComponent'
const mapDispatchToProps = {
  addEvent: () => addEvent(),
}

const mapStateToProps = (state) => {
  const ret = Object.assign({},
    state.eventData,
    {initialValues: state.eventData})
  console.log(ret)
  return ret
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'eventForm'})(EventLanding))
