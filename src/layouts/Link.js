import { h } from 'preact' // eslint-disable-line no-unused-vars
import { Link as NativeLink } from 'preact-router/match'

const Link = props => (
  <NativeLink activeClassName='is-active' {...props} />
)

export default Link
