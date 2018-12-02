import './styles.sass'
import 'nprogress/nprogress.css'
import { h } from 'preact' // eslint-disable-line no-unused-vars
import Router from 'preact-router'
import { Navbar, Page, Footer } from './layouts'
import { Home, Blog, Error } from './pages'

const App = props => (
  <div id='fragment' class='is-flex'>
    <header>
      <Navbar />
    </header>
    <main>
      <Router>
        <Page path='/' component={Home} noContainer />
        <Page path='/about' />
        <Page path='/contact' />
        <Page path='/blog' component={Blog} />
        <Page path='/blog/:id' />
        <Page default component={Error} />
      </Router>
    </main>
    <Footer />
  </div>
)

export default App
