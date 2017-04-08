/**
 * Created by hreid on 4/7/17.
 */

import React, { Component, PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'

class Navbar extends Component {
  render() {
    return (
      <nav className="text-right">
        <Link to='/events' activeClassName='route--active'>
          Events
        </Link>
        {(!this.props.user.loggedIn) ? (
          <Link to='/counter' activeClassName='route--active'>
            sign-in
          </Link>
          ) : (
          <Link to='/counter' activeClassName='route--active'>
            sign-out
          </Link>
          )
        }
      </nav>
    )
  }
}

export default Navbar
