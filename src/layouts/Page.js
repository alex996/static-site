import { h, Component } from 'preact' // eslint-disable-line no-unused-vars
import { Progress } from '../components'
import { Error } from '../pages'

class Page extends Component {
  state = {
    err: null, fromCache: false
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
      } else {
        this.setState({ fromCache: true })
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
            this.setState({ [url]: contents, fromCache: false })
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

  get content () {
    const { err, fromCache } = this.state

    if (err) {
      return <Error {...err} />
    }

    const { url, component: Component } = this.props

    if (Component) {
      return <Component {...this.props} />
    }

    const html = this.state[url]

    if (html) {
      return (
        <div
          class={`content${fromCache ? '' : ' has-fade-in'}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )
    }

    return <Progress parent='#section' />
  }

  render () {
    const { noContainer = false } = this.props

    return noContainer
      ? this.content
      : (
        <section class='section' id='section'>
          <div class='container'>
            {this.content}
          </div>
        </section>
      )
  }
}

export default Page
