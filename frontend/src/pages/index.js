import * as React from "react"
import Layout from '../components/layout'
import Hero from '../components/0_Hero'
import Mission from '../components/1_Mission'
import Blog from '../components/2_Blog'
import Services from '../components/3_Services'
import About from '../components/4_About'
import Contact from '../components/5_Contact'


const IndexPage = () => {
  return (
    <Layout>
      <main>
        <Hero />
        <Mission />
        <Blog />
        <Services />
        <About />
        <Contact />
      </main>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
