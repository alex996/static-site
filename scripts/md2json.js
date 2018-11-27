const fs = require('fs')
const dir = require('node-dir')
const unified = require('unified')
const markdown = require('remark-parse')
const remark2rehype = require('remark-rehype')
const html = require('rehype-stringify')

const input = 'content'
const output = `dist/${input}`

if (!fs.existsSync(output)) {
  console.log(`📁 Make /${output}\n`)
  fs.mkdirSync(output, { recursive: true })
}

console.log(`📂 Change to /${input}`)
process.chdir(input)

const processor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(html)

console.log(`\n⌚ Loop through files`)
dir.readFiles('.',
  { match: /.md$/ },
  (err, content, filename, next) => {
    if (err) throw err

    console.log(`\n📝 Convert ${filename}`)
    processor.process(content, (err, { contents }) => {
      if (err) throw err

      const [ name ] = filename.split('.md')

      const json = JSON.stringify({ contents })
      const file = `${name}.json`

      console.log(`\n💽 Save ${file}`)
      fs.writeFile(`../${output}/${file}`, json, 'utf8', err => {
        if (err) throw err
      })
    })

    next()
  }, (err, files) => {
    if (err) throw err
    console.log('\n 🎉 Done!')
  })
