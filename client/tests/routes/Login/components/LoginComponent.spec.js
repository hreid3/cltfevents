/**
 * Created by hreid on 4/8/17.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import LoginComponent, {validateLogin} from 'routes/Login/components/LoginComponent'
import {shallow, mount} from 'enzyme'
import {initialUserState} from 'store/user'

const submitButtonSelector = "button[type='submit']";

describe('(Component) Login', () => {
  let _props, _spies, _wrapper
    beforeEach(() => {
      _spies = {}
      _props = {
        user: initialUserState,
        ...bindActionCreators({
          doLogin: (_spies.doLogin = sinon.spy())
        }, _spies.dispatch = sinon.spy())
      }
      _wrapper = mount(<LoginComponent {..._props} />)
    })

  it('Should render as a <LoginComponent>.', () => {
    expect(_wrapper.is('LoginComponent')).to.equal(true)
  })

  it('Should render username field with empty value', () => {
    expect(_wrapper.find('#username')).to.have.length(1)
    expect(_wrapper.find('#username').prop('value')).to.equal('')
  })

  it('Should render password field with empty value', () => {
    expect(_wrapper.find('#password')).to.have.length(1)
    expect(_wrapper.find('#password').prop('value')).to.equal('')
  })

  it ('Should render button', () => {

    expect(_wrapper.find(submitButtonSelector)).have.length(1)
  })

  describe('Login with no fields completed', () => {
    let _button, _userField, _passwordField

    beforeEach(() => {
      _button = _wrapper.find(submitButtonSelector).first()
      _userField = _wrapper.find('#username')
      _passwordField = _wrapper.find('#password')
    })
    it('has bootstrap classes', () => {
      expect(_button).to.have.length(1)
      expect(_button.hasClass('btn')).to.be.true
      expect(_button.hasClass('btn-default')).to.be.true

    })

    it('Click submit button missing all fields', () => {
      _spies.dispatch.should.have.not.been.called

      _button.simulate('submit')

      _spies.dispatch.should.have.not.been.called
      _spies.doLogin.should.have.not.been.called
    })

    it('Click submit button all fields missing', () => {
      _spies.dispatch.should.have.not.been.called
      _userField.simulate('change', {target: {value: 'abc'}})
      _passwordField.simulate('change', {target: {value: 'abc'}})

      _button.simulate('submit')

      _spies.dispatch.should.have.been.called
      _spies.doLogin.should.have.been.called
    })
  })

  describe('check validation function', () => {
    it('username and password blank', () => {
      const result = validateLogin({username: '', password: ''})
      expect(result.username).to.not.be.undefined
      expect(result.password).to.not.be.undefined
    })

    it('Username has value', () => {
      const result = validateLogin({username: 'abc', password: ''})
      expect(result.username).to.be.undefined
    })

    it('Password has value', () => {
      const result = validateLogin({username: '', password: 'abc'})
      expect(result.password).to.be.undefined
    })

  })

})
