import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import {utc} from 'moment';
import AttendeeLandingComponent from '../components/AttendeeLandingComponent'
import DataObjectParser from 'dataobject-parser'
import _ from 'lodash'
import moment from 'moment'
import { showModal, MODAL_TYPE_CONFIRMATION } from '../../../store/modal'
import { initialize } from '../modules/attendee'
const validator = require('validate.js')

const constraints = {

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
    initialize: () => dispatch(initialize())
  }
}

const mapStateToProps = (state) => {
  return {...state.attendeeData}
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendeeLandingComponent)
