// https://unified.js.org/using-unified.html
// https://www.npmjs.com/package/unified (used by react-markdown)

const fs = require('fs-extra')
const dir = require('node-dir')
const unified = require('unified')
const markdown = require('remark-parse')
const remark2rehype = require('remark-rehype')
const html = require('rehype-stringify')

const input = 'content'
const output = `build/json`

fs.ensureDir(output)
  .then(() => {
    process.chdir(input)

    const processor = unified()
      .use(markdown)
      .use(remark2rehype)
      .use(html)

    dir.readFiles('.',
      { match: /.md$/ },
      (err, content, filename, next) => {
        if (err) throw err

        processor.process(content, (err, { contents }) => {
          if (err) throw err

          const [ fileNoExt ] = filename.split('.md')
          const path = `../${output}/${fileNoExt}.json`

          fs.outputJson(path, { contents })
        })

        next()
      }, (err, files) => {
        if (err) throw err
        console.log('Converted MD to JSON')
      })
  })
  .catch(console.error)
