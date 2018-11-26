import { h } from 'preact' // eslint-disable-line no-unused-vars
import { Link } from 'preact-router'

const Navbar = props => (
  <nav>
    <Link href='/'>Home</Link>
    <Link href='/blog'>Blog</Link>
  </nav>
)

export default Navbar
