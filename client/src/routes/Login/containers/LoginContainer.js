import { connect } from 'react-redux'

import {doLogin} from '../../../store/user'
import LogoinComponent from '../components/LoginComponent'

const mapDispatchToProps = (dispatch) => {
   return { doLogin : (username, password) => dispatch(doLogin(username, password)) }
}

const mapStateToProps =(state) => {
   return {user : state.user}
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoinComponent)
