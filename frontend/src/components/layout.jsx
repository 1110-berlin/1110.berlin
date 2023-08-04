import React from 'react'
import Navigation from '../layout/Navigation'
import Footer from '../layout/Footer'

const Layout = ({ children, ...rest }) => (
    <>
        <Navigation />
        <div {...rest}>
            {children}
        </div>
        <Footer />
    </>

)

export default Layout