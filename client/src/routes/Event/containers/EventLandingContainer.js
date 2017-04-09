import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { addEvent } from '../modules/event'

import EventLanding from '../components/EventLandingComponent'
const mapDispatchToProps = {
  addEvent: () => addEvent(),
}

const mapStateToProps = (state) => state.eventData

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'eventForm'})(EventLanding))