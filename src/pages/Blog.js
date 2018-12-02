import { h, Component } from 'preact' // eslint-disable-line no-unused-vars
import { Link } from 'preact-router/match'

class Blog extends Component {
  state = {
    posts: []
  }

  // TODO: this gets unmounted
  componentDidMount () {
    fetch('/json/blog/index.json')
      .then(res => {
        res.json()
          .then(posts => {
            this.setState({ posts })
          })
      })
  }

  render () {
    return (
      <div class='content'>
        <h1>Blog</h1>

        <ul>
          {this.state.posts.map(post => (
            <li>
              <Link href={post.slug}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Blog
