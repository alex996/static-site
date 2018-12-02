import { h, Component } from 'preact' // eslint-disable-line no-unused-vars
import NProgress from 'nprogress'

class Progress extends Component {
  componentDidMount () {
    NProgress
      .configure({ parent: this.props.parent, showSpinner: false })
      .start()
  }

  componentWillUnmount () {
    NProgress.done()
  }
}

export default Progress
