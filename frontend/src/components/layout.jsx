import React from 'react'
import Navigation from '../layout/Navigation'
const Layout = ({ children, ...rest }) => (
    <>
        <Navigation />
        <div {...rest}>
            {children}
        </div>
    </>

)

export default Layout