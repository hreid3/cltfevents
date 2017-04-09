
import { connect } from 'react-redux'

import Navbar from '../components/Navbar'

const mapStateToProps = (state) => state
const mapDispatchToProps = (dispatch ) => {
  return {"test": "test"}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
