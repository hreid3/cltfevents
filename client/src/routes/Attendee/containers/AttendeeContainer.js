import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import {utc} from 'moment';
import AttendeeLandingComponent from '../components/AttendeeLandingComponent'
import DataObjectParser from 'dataobject-parser'
import _ from 'lodash'
import moment from 'moment'
import { showModal, MODAL_TYPE_CONFIRMATION } from '../../../store/modal'
import { initialize, loadAttendeeDetailData } from '../modules/attendee'
const validator = require('validate.js')

const mapDispatchToProps = (dispatch) => {
  return {
    initialize: () => dispatch(initialize()),
    loadAttendeeDetailData: _id => dispatch(loadAttendeeDetailData(_id))
  }
}

const mapStateToProps = (state) => {
  return {...state.attendeeData}
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendeeLandingComponent)
