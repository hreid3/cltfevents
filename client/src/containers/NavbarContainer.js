
import { connect } from 'react-redux'

import Navbar from '../components/Navbar'

const mapStateToProps = (state) => {
  console.log(state)
  return state
}

const mapDispatchToProps = (dispatch ) => {
  return {"test": "test"}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
