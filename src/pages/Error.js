import { h } from 'preact' // eslint-disable-line no-unused-vars

const Error = ({ code = 404, message = 'Not Found.' }) => (
  <>
    <h1>{code}</h1>
    <h2>{message}</h2>
  </>
)

export default Error
