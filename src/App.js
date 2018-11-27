import 'bulma/css/bulma.css'
import { h } from 'preact' // eslint-disable-line no-unused-vars
import Router from 'preact-router'
import { Navbar, Page } from './layouts'
import { Home, Error } from './pages'

const App = props => (
  <main>
    <Navbar />
    <Router>
      <Page path='/' component={Home} />
      <Page path='/about' />
      <Page path='/blog' />
      <Page default component={Error} />
    </Router>
  </main>
)

export default App
