import { h, render } from 'preact' // eslint-disable-line no-unused-vars
import App from './App'

const root = document.getElementById('root')

if (root.hasChildNodes()) {
  render(<App />, root, root.firstElementChild)
} else {
  render(<App />, root)
}
