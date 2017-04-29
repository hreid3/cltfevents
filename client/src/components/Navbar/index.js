/**
 * Created by hreid on 4/7/17.
 */

import React, { Component, PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'
// <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
//   <ul class="nav navbar-nav">
//   <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
//   <li><a href="#">Link</a></li>
//   <li class="dropdown">
//   <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
//   <ul class="dropdown-menu">
//   <li><a href="#">Action</a></li>
//   <li><a href="#">Another action</a></li>
// <li><a href="#">Something else here</a></li>
// <li role="separator" class="divider"></li>
//   <li><a href="#">Separated link</a></li>
// <li role="separator" class="divider"></li>
//   <li><a href="#">One more separated link</a></li>
// </ul>
// </li>
// </ul>

const Navbar = (props) => {
  return (
    <ul className="nav navbar-nav  navbar-right">
      <li><Link to='/events' activeClassName='route--active'>
        Events
      </Link></li>
      <li><Link to='/attendee' activeClassName='route--active'>
        Attendees
      </Link></li>
      {(!props.user.loggedIn) ? (
        <li><Link to='/login' activeClassName='route--active'>
            sign-in
          </Link></li>
        ) : (
          <li><Link to='/logout' activeClassName='route--active'>
            sign-out
          </Link></li>
        )
      }
    </ul>
  )
}

export default Navbar
