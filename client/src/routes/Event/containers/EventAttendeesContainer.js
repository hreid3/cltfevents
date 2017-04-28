import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import EventAttendeesComponent from '../components/EventAttendeesComponent'
import {
  getEventAttendees,
  doSubmitAttendeeForm,
  doSubmitPaymentForm
} from '../modules/event'
import { showModal, MODAL_TYPE_WRAPPED_COMPONENT } from '../../../store/modal'


const mapDispatchToProps = (dispatch) => {
  return {
    doSubmitAttendeeForm: (values) => dispatch(doSubmitAttendeeForm(values)),
    doSubmitPaymentForm: (values, row, formProps) => dispatch(doSubmitPaymentForm(values, row, formProps)),
    getEventAttendees: () => dispatch(getEventAttendees()),
    openBookingForm: (wrappedComponent) => dispatch(showModal(MODAL_TYPE_WRAPPED_COMPONENT, {
      title: 'Booking Attendee',
      wrappedComponent: wrappedComponent
    })),
  }
}

const mapStateToProps = (state) => {
  return state.eventData
}

export default connect(mapStateToProps, mapDispatchToProps)(EventAttendeesComponent)
