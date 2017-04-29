import React from 'react'
import './CoreLayout.scss'
import '../../styles/core.scss'
import NavbarContainer from '../../containers/NavbarContainer'
import DocumentTitle from 'react-document-title'

export const CoreLayout = ({ children }) => (
  <div className=''>
    <nav className="navbar navbar-default top-nav-wrapper">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">
            CLT Fellowship Churches INC
          </a>
        </div>
        <NavbarContainer />
     </div>
    </nav>
    <div className="">
      <div className='core-layout__viewport'>
        <div className="container">
          <DocumentTitle title="Home">
          {children}
          </DocumentTitle>
        </div>
      </div>
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}


export default CoreLayout
