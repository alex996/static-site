<h2 align="center">Roadmap</h2>

### 🎉 DONE

- [x] Set up `rollup` + `babel` build step
  - transpile, uglify ES6+ (prod only), copy `index.html`
- [x] Wire up `preact` + `preact-router`
  - `h` pragma in `babel`, initial routes, 404 fallback
- [x] Add `bulma` + `rollup` CSS plugin
  - concat into static `styles.css` only, **not** runtime
- [x] Convert Markdown to HTML in JSON
  - `unified` libs + script to loop files, generate `html`, & embed in `json`
- [x] Fetch JSON & inject HTML for each route
  - page component, either fetch `[/path].json` or render `component` prop
  - loading state; render `<Error />` if failed to load or `404`
- [x] Set up pre-rendering (`react-snapshot`)
  - crawl all pages & generate static HTML, then hydrate on FE
- [x] Enable nested routes, e.g. `/blog/how-i-build-this-site`
  - loop recursively & mirror tree structure & filenames
- [x] Generate `index.json` listing for each subdir (`/blog`, `/series`)
  - should include embed metadata in `md`
    - title, published at (Unix timestamp), **tags**, img URL
  - posts should be ordered by publish date (desc)
- [x] Only pull in required Bulma modules (`saas`)
  - [customizing vars](https://github.com/jgthms/bulma-start/blob/master/css/main.css) (need rollup saas plugin)
- [x] Add subtle loading effect (`nanobar`)

### 🏗️ TODO

- [ ] Markdown themes (e.g. GitHub), code snippets highlight
- [ ] Embed `[hash]` in assets filename (`rollup` plugin)
- [ ] Load `/build/img/*.png` assets + minify with `imagemin`
  - allow embeding img in `md` files? (raw `<img />` HTML)
- [ ] Set up unit tests with `jest`
- [ ] `.editorconfig` file
- [ ] `sitemap.xml`, `robots.txt` (ignore `json`?)
- [ ] GA signup + add script
- [ ] Don't (re-)generate json if MD didn't change?
- [ ] `es` (`type='module')` and `iife` (`nomodule`, IE 11?) bundles (see [this](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/))
  - ⚠️ blocked by [`rollup-plugin-terser`](https://github.com/TrySound/rollup-plugin-terser/issues/17)
- [ ] scripts can be executable binaries (see [this](https://developer.atlassian.com/blog/2015/11/scripting-with-node/))
- [ ] Set up a build pipeline (lint, test, build)
- [ ] Deploy to static host (Now / Surge) + domain

### 🚀 POC

- [ ] replace `preact` with `inferno` + `inferno-router`
  - compare bundle size, load time benchmarks, [composition vs inheritance](https://medium.com/javascript-scene/a-simple-challenge-to-classical-inheritance-fans-e78c2cf5eead)
- [ ] email contact form + reCAPTCHA
- [ ] disqus comments for each blog post / video
