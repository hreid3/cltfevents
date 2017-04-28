import React, {Component} from 'react'
import { Field } from 'redux-form'
import {
  textField,
  selectField,
  datetimePickerField
} from '../../../components/ReduxFormRenderedFields'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router'

export default class AttendeeFormComponent extends Component {

  constructor(props) {
    super(props)

  }

  componentDidMount() {
    console.log('consoledMounted', this.props)
    this.props.initialAttendeeForm(this.props._id || null)
  }

  render() {
    const {handleSubmit, pristine, reset, submitting, lookupData, details} = this.props
    let breadcrumb = (
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        <li className="breadcrumb-item"><Link to="/attendee">Attendee</Link></li>
        <li className="breadcrumb-item active">New Attendee</li>
      </ol>
    )
    if (this.props.action === 'edit') {
      breadcrumb = (
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/attendee">Attendee</Link></li>
          <li className="breadcrumb-item"><Link to={"/attendee/" + this.props._id}>{details.firstName + ' ' + details.lastName}</Link></li>
          <li className="breadcrumb-item active">Edit</li>
        </ol>
      )
    }
    return (
      <div>
        <DocumentTitle title="New Attendee">
          <div className="row">
            <div className="col-12">
              <h1>Attendee Entry Form</h1>
              {breadcrumb}
            </div>
          </div>
        </DocumentTitle>
        <form onSubmit={handleSubmit} className="attendee-form">
          <div className="row">
            <div className="col-md-8 ">
              <Field name="details.title" type="text" component={textField} label="Title"
                     placeholder="Mr." id="title" autoFocus={true} size="10" />
              <Field name="details.email" type="text" component={textField} label="Email"
                     placeholder="jsmith@youraddress.com" id="email" />
              <Field name="details.firstName" type="text" component={textField} label="First Name"
                     placeholder="James" id="firstName" />
              <Field name="details.lastName" type="text" component={textField} label="Last Name"
                     placeholder="Smith" id="lastName" />
              <Field name="details.suffix" type="text" component={textField} label="Suffix"
                     placeholder="Jr., III" id="lastName" />
              <Field name="details.datOfBirth" type="text" component={datetimePickerField}
                     label="Date of Birth" placeholder=""/>
              <Field name="details.companyName" type="text" component={textField} label="Company Name"
                     placeholder="Optional" id="companyName" />
              {/*<Field name="details.location.label" type="text" component={textField}*/}
                     {/*placeholder="Please enter Location Label" label="Home Location" id="location.label"/>*/}
              <Field name="details.homeAddess.street" type="text" component={textField}
                     placeholder="E.g. 14 Tammy Drive" label="Street Address" id="location.street"/>
              <Field name="details.location.city" type="text" component={textField} placeholder="E.g. Middletown"
                     label="City" id="homeAddess.city"/>
              <Field name="details.homeAddess.state" type="text" component={selectField} placeholder="Select a state"
                     label="State" options={lookupData.states}/>
              <Field name="details.homeAddess.postal" type="text" component={textField} placeholder="12345"
                     label="Zipcode" id="location.postal"/>
              <hr/>
            </div>
            <div className="col-md-4">
              <Field name="details.status" type="text" component={selectField} placeholder="Status"
                     label="Status" options={lookupData.statuses}/>
              <Field name="details.role" type="text" component={selectField} placeholder="Role"
                     label="Role" options={lookupData.roles}/>
              <Field name="details.homeChurch" type="text" component={selectField}
                     placeholder="Please select the home church" label="Home Church"
                     options={lookupData.homeChurches}/>
              <Field name="details.contactMobile" type="text" component={textField} label="Mobile Phone"
                     placeholder="(212) 555-1212" id="contactMobile" />
              <Field name="details.contactHomePhone" type="text" component={textField} label="Contact Home Phone"
                     placeholder="(917) 555-1212" id="contactHomePhone" />
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              <hr/>
              <div>
                <button type="submit" disabled={submitting} className="pt-button pt-intent-primary">Submit <span
                  className="pt-icon-standard pt-icon-arrow-right pt-align-right"></span></button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
