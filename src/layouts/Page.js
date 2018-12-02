import { h, Component } from 'preact' // eslint-disable-line no-unused-vars
import { Error } from '../pages'

class Page extends Component {
  state = {
    err: null
  }

  componentDidMount () {
    const { component, url } = this.props

    !component && this.fetchContents(url)
  }

  componentWillReceiveProps (nextProps) {
    const { component, url } = nextProps

    if (this.props.url !== url) {
      this.setState({ err: null })

      if (!component && !this.state[url]) {
        this.fetchContents(url)
      }
    }
  }

  // TODO: move to api.js
  fetchContents (url) {
    fetch(`/json${url}.json`)
      .then(res => {
        if (res.ok) {
          res.json().then(({ contents }) => {
            // TODO: cache in offline storage (cache with or service worker)
            this.setState({ [url]: contents })
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

    const { url, component: Component } = this.props

    if (Component) {
      return <Component {...this.props} />
    }

    const html = this.state[url]

    if (!html) {
      return <h1>Loading...</h1>
    }

    return (
      <section class='section'>
        <div class='container'>
          <div class='content' dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </section>
    )
  }
}

export default Page
