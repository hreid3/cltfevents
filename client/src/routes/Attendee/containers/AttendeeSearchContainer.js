/**
 * Created by hreid on 4/21/17.
 */

import { connect } from 'react-redux'
import { doAttendeeSearch } from '../modules/attendee'
import AttendeeSearchComponent from '../components/AttendeeSearchComponent'

const mapStateToProps = (state) => {
  return {...state.attendeeData}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (searchText, colInfos, multiColumnSearch) => dispatch(doAttendeeSearch(searchText, colInfos, multiColumnSearch))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendeeSearchComponent)
