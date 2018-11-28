import { h, Component } from 'preact' // eslint-disable-line no-unused-vars
import { Error } from '../pages'

class Page extends Component {
  state = {
    err: null
  }

  componentDidMount () {
    !this.props.component && this.fetchContents()
  }

  componentDidUpdate (prevProps) {
    const { component, path } = this.props

    if (prevProps.path !== path) {
      this.setState({ err: null })

      if (!component && !this.state[path]) {
        this.fetchContents()
      }
    }
  }

  fetchContents () {
    const { path } = this.props

    return fetch(`/json${path}.json`)
      .then(res => {
        if (res.ok) {
          res.json().then(({ contents }) => {
            // TODO: cache in offline storage
            this.setState({ [path]: contents })
          })
        } else {
          this.setState({
            err: {
              code: res.status,
              message: res.statusText
            }
          })
        }
      })
      .catch(err => {
        console.error(err)
        this.setState({
          err: {
            code: 500,
            message: 'Server Error.'
          }
        })
      })
  }

  render () {
    const { err } = this.state

    if (err) {
      return <Error {...err} />
    }

    const { path, component: Component } = this.props

    if (Component) {
      return <Component {...this.props} />
    }

    const html = this.state[path]

    if (!html) {
      return <h1>Loading...</h1>
    }

    return <div dangerouslySetInnerHTML={{ __html: html }} />
  }
}

export default Page
