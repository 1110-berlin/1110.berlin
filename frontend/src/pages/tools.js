import React from 'react';
import Nmap from '../components/Nmap'
import Layout from '../components/layout'

const ExploitPage = () => {
    return (
        <>
            <Layout>
                <Nmap />
                <div></div>
            </Layout>
        </>
    )
}

export default ExploitPage

export const Head = () => <title>Hack the Planet</title>
