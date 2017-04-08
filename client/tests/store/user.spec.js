import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  doLogin,
  initialUserState,
  default as loginReducer
} from 'store/user'

describe('(Reducer Module) Login', () => {
  it ('should export constant USER_LOGGED_IN.', () => {
    expect(USER_LOGGED_IN).to.equal('USER_LOGGED_IN')
  })
  it ('should export constant USER_LOGGED_OUT.', () => {
    expect(USER_LOGGED_OUT).to.equal('USER_LOGGED_OUT')
  })

  describe('(Reducer)', () => {
    it('Should be a funciton.', () => {
      expect(loginReducer).to.be.a('function')
    })

    it('LoggedIn state should be set to false on initialize', () => {
      expect(loginReducer(undefined, {})).to.have.property('loggedIn', false)
    })
  })

  describe('(Actions)', () => {
    it('Should be exported as a function', () => {
      expect(doLogin).to.be.a('function')
    })

    it ('Should log in', () => {
      const result = doLogin('abc','abc');
      expect(result.type).to.equal(USER_LOGGED_IN)
    })
  })
  describe('(Action Creators)', () => {
    it('will be required when connecting to backend', () => {

    })
  })
})

