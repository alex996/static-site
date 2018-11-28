<p align="center"><img width="300" src="https://user-images.githubusercontent.com/15240969/49132160-0f9ad400-f2a9-11e8-9e3a-a3ca40d71026.png"></p>

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

### 🏗️ TODO

- [ ] Set up `preact-helmet` instead of static `index.html`
  - favicon, `links`s, `script`s, any `meta`, etc.
  - make title configurable (404 page)
- [ ] Enable nested routes, e.g. `/blog/how-i-build-this-site` (ref. [`jdown`](https://github.com/DanWebb/jdown))
  - loop recursively & mirror tree structure & filenames
- [ ] Generate `index.json` listing for each subdir (`/blog`, `/series`)
  - should include title, published at (Unix timestamp), **tags**
    - maybe embed metadata in `md`, include in listing, then remove at build time?
  - posts/vids should be ordered by publish date (desc)
  - maybe `index0-20.json`, `index20-40.json` etc. + continuous scroll/load ?
```
/build
  /json
    /blog
      how-to-setup-jamstack.json <--- GET /json/blog/how-to-setup-jamstack.json
      index.json
    /series
      /learn-react-and-mui
        /episodes/
          1.json <--- GET /series/learn-react-and-mui/episodes/1 (or proper title?)
    about.json
```
- [ ] Design the landing page
- [ ] Design & implement video series
  - Write `unified` plugins to
    - replace `<a>` with `<Link>`
    - wrap with `<div class='content'>` for styling
    - embed Bulma classes (title, text, subtitle, etc.)
    - ⚠️ requires to write `unified` AST plugin(s)
- [ ] Only pull in required Bulma modules (`saas`)
  - [customizing vars](https://github.com/jgthms/bulma-start/blob/master/css/main.css) (need rollup saas plugin?)
- [ ] Markdown themes (e.g. GitHub), code snippets highlight
- [ ] Embed `[hash]` in assets filename (`rollup` plugin)
- [ ] Load `/build/img/*.png` assets + minify with `imagemin`
  - allow embeding img in `md` files? (raw `<img />` HTML)
- [ ] Set up unit tests with `jest`
- [ ] Add subtle loading effect (`nanobar`?)
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
