import { h } from 'preact' // eslint-disable-line no-unused-vars
import Router from 'preact-router'
import { Navbar } from './layouts'
import { Home, Blog, NotFound } from './pages'

const App = props => (
  <main>
    <Navbar />
    <Router>
      <Home path='/' />
      <Blog path='/blog' />
      <NotFound default />
    </Router>
  </main>
)

export default App
