import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import {utc} from 'moment';
import AttendeeFormComponent from '../components/AttendeeFormComponent'
import DataObjectParser from 'dataobject-parser'
import _ from 'lodash'
import moment from 'moment'
import { showModal, MODAL_TYPE_CONFIRMATION } from '../../../store/modal'
import { initialAttendeeForm, doSubmitAttendeeForm } from '../modules/attendee'
const validator = require('validate.js')

const constraints = {
  firstName: {
    presence: true,
  },
  lastName: {
    presence: true,
  },
  email: {
    email: true,
    length: {
      minimum: 6,
      message: 'must be at least 6 characters'
    }
  },
  contactMobile: {
    presence: true,
    length: {
      minimum: 6,
      message: 'must be at least 6 characters'
    }
  },
  "status": {presence: {message: "was not selected"}},
  "role": {presence: {message: "was not selected"}},
}

export const validate = values => {
  const { details } = values
  const errors = validator(details, constraints)
  const d = new DataObjectParser()

  if (errors) {
    _.forIn(errors, (val, key) => d.set(key, val))
  }
  return { details: d.data() }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialAttendeeForm: (_id) => dispatch(initialAttendeeForm(_id)),
    onSubmit: (values) => dispatch(doSubmitAttendeeForm(values)),
    validate: validate
  }
}

const mapStateToProps = (state) => {
  return {...state.attendeeData}
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'attendeeForm'})(AttendeeFormComponent))
