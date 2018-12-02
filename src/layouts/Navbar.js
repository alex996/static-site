import { h } from 'preact' // eslint-disable-line no-unused-vars
import Link from './Link'

const Navbar = props => (
  <nav class='navbar has-shadow is-spaced' role='navigation' aria-label='main navigation'>
    <div class='container'>
      <div class='navbar-brand'>
        <Link class='navbar-item' href='/'>
          <img src='https://bulma.io/images/bulma-logo.png' width='112' height='28' />
        </Link>

        <a role='button' class='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navbar'>
          <span aria-hidden='true' />
          <span aria-hidden='true' />
          <span aria-hidden='true' />
        </a>
      </div>

      <div id='navbar' class='navbar-menu'>
        <div class='navbar-start'>
          <Link class='navbar-item is-tab' href='/'>
            Home
          </Link>
          <Link class='navbar-item is-tab' href='/blog'>
            Blog
          </Link>
          <Link class='navbar-item is-tab' href='/about'>
            About
          </Link>
          <Link class='navbar-item is-tab' href='/contact'>
            Contact
          </Link>
        </div>

        <div class='navbar-end'>
          <div class='navbar-item'>
            <div class='buttons'>
              <a class='button is-primary'>
                <strong>Sign up</strong>
              </a>
              <a class='button is-light'>
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
)

export default Navbar
