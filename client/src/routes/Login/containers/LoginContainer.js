import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import {doLogin} from '../../../store/user'
import LoginForm from '../components/LoginForm'

export const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = "Required"
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.password) {
    errors.password = "Required"
  }
  return errors
}

const mapDispatchToProps = (dispatch) => {
   return {
     onSubmit: (values) => dispatch(doLogin(values.username, values.password)),
     validate: validate
   }
}

const mapStateToProps =(state) => {
   return {initialValues : state.user}
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'loginForm'}) (LoginForm))
