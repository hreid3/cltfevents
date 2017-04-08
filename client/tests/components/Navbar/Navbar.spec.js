/**
 * Created by hreid on 4/8/17.
 */
import React from 'react'
import Navbar from 'components/Navbar'
import { shallow } from 'enzyme'

describe('(Component) Top Navbar', () => {
  let _wrapper

  beforeEach(() => {
    // _wrapper = shallow(<Navbar />)
  })

  it('Has sign-in link', () => {
    _wrapper = shallow(<Navbar user={{loggedIn: false}}/>)
    expect(_wrapper.find("Link[to='/login']")).to.have.length(1)
  })

  it('Has sign-out link', () => {
    _wrapper = shallow(<Navbar user={{loggedIn: true}}/>)
    expect(_wrapper.find("Link[to='/logout']")).to.have.length(1)
  })
})
