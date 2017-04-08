import React from 'react'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'
import NavbarContainer from '../../containers/NavbarContainer'

export const CoreLayout = ({ children }) => (
  <div className='container'>
    <NavbarContainer />
    <div className="text-center">
      <Header />
      <div className='core-layout__viewport'>
        {children}
      </div>
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}


export default CoreLayout
