import { h, Component } from 'preact' // eslint-disable-line no-unused-vars
import { Link } from 'preact-router'

class Blog extends Component {
  state = {
    posts: []
  }

  componentDidMount () {
    fetch('/json/blog/index.json')
      .then(res => {
        res.json()
          .then(posts => {
            console.log(posts)
            this.setState({ posts })
          })
      })
  }

  render () {
    return (
      <section class='section'>
        <div class='container'>
          <h1 class='is-1'>Blog</h1>

          <ul>
            {this.state.posts.map(post => (
              <li>
                <Link href={post.slug}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }
}

export default Blog
