/**
 * Created by hreid on 4/22/17.
 */

import React, {Component} from 'react'
import {Link} from 'react-router'
import DocumentTitle from 'react-document-title'
import AddressRenderer from '../../../components/Shared/AddressRenderer'

class AttendeeDetailsCompoent extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadAttendeeDetailData(this.props._id)
  }

  render() {
    const {
      _id,
      title,
      email,
      firstName,
      middleInitial,
      lastName,
      suffix,
      datOfBirth,
      homeChurch,
      companyName,
      homeAddress,
      contactMobile,
      contactHomePhone,
      disabilities,
      bioImageUri,
      status,
      role
    } = this.props.details

    console.log('props', this.props)
    if (!lastName) {
      return <div></div>
    }
    let homeAddressComponent = <div></div>
    if (homeAddress) {
      homeAddressComponent = <AddressRenderer location={homeAddress.location} title={homeAddress.title} label="Home Address"/>
    }
    let homeChurchComponent = <div></div>
    if (homeChurch) {
      homeChurchComponent = <AddressRenderer location={homeChurch.location} title={homeChurch.title} label="Home Church"/>
    }

    return (
      <div>
        <div className="row">
          <DocumentTitle title="Attendee Details">
            <div className="col-md-12">
              <h1>Attendee Details</h1>
            </div>
          </DocumentTitle>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12">
                <div className="pt-button-group pt-large float-right">
                  <Link className="btn btn-warning" tabIndex="0" to={`/attendee/${_id}/edit`} role="button">Edit Attendee</Link>&nbsp;
                  {/*<a className="btn btn-warning" tabIndex="1" onClick={() => deleteAttendee(_id, firstName + " " + lastName)} role="button">Delete Event</a>*/}
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <div className=" panel panel-primary">
                  <div className="panel-heading">Full Name</div>
                  <div className="panel-body">
                    <div>{title} {firstName} {middleInitial} {lastName} {suffix}</div>
                    <div><span>Email:</span>&nbsp;&nbsp;<span>{email}</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
              </div>
            </div>
            {homeAddressComponent}
            {homeChurchComponent}
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-12">
                <div className=" panel panel-primary">
                <div className="panel-heading" >Status</div>
                <div className="panel-body">{status.title}</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className=" panel panel-primary">
                <div className="panel-heading" >Role</div>
                <div className="panel-body">{role.title}</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className=" panel panel-primary">
                <div className="panel-heading" >Contact Mobile</div>
                <div className="panel-body">{contactMobile}</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className=" panel panel-primary">
                <div className="panel-heading" >Contact Home</div>
                <div className="panel-body">{contactHomePhone}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AttendeeDetailsCompoent
