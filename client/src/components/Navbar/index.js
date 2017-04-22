/**
 * Created by hreid on 4/7/17.
 */

import React, { Component, PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'

const Navbar = (props) => {
  return (
    <nav className="text-right">
      <Link to='/events' activeClassName='route--active'>
        Events
      </Link> |
      <Link to='/attendee' activeClassName='route--active'>
        Attendees
      </Link> |
      {(!props.user.loggedIn) ? (
          <Link to='/login' activeClassName='route--active'>
            sign-in
          </Link>
        ) : (
          <Link to='/logout' activeClassName='route--active'>
            sign-out
          </Link>
        )
      }
    </nav>
  )
}

export default Navbar
