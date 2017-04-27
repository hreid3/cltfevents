import React from 'react'
import './CoreLayout.scss'
import '../../styles/core.scss'
import NavbarContainer from '../../containers/NavbarContainer'
import DocumentTitle from 'react-document-title'

export const CoreLayout = ({ children }) => (
  <div className='container-fluid'>
    <div className="top-nav-wrapper">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
          CLT Fellowship Churches INC
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <NavbarContainer />
        </div>
      </div>
    </div>

    <div className="">
      <div className='core-layout__viewport'>
        <DocumentTitle title="Home">
        {children}
        </DocumentTitle>
      </div>
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}


export default CoreLayout
