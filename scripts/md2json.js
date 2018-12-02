const unified = require('unified')
const markdown = require('remark-parse')
const frontmatter = require('remark-frontmatter')
const parseYaml = require('remark-parse-yaml')
const remark2rehype = require('remark-rehype')
const html = require('rehype-stringify')

const path = require('path')
const fs = require('fs-extra')
const dir = require('node-dir')
const vfile = require('to-vfile')

const markdownDir = 'content'
const jsonDir = 'build/json'
const index = {}

const indexer = () =>
  (tree, vfile) => {
    const { dir = '.', name } = path.parse(vfile.history[0])

    if (dir) {
      const { data: { parsedValue } } = tree.children[0]
      const file = { slug: `/${dir}/${name}`, ...parsedValue }

      if (index[dir]) {
        index[dir].push(file)
      } else {
        index[dir] = [file]
      }
    }
  }

const processor = unified()
  .use(markdown)
  .use(frontmatter)
  .use(parseYaml)
  .use(indexer)
  .use(remark2rehype)
  .use(html)

// Make /build/json if doesn't exist
fs.ensureDir(jsonDir)
  .then(() => {
    // Change current dir to /content
    process.chdir(markdownDir)

    // Recursively iterate all files & return filenames
    return dir.promiseFiles('.')
  })
  .then(files => {
    // Read & process each file in the array as vfile
    const operations = files.map(filename => {
      return vfile.read(filename)
        .then(file => {
          // Convert the file to HTML and save HTML in JSON
          return processor.process(file, (err, { contents }) => {
            if (err) throw err

            const [ fileNoExt ] = filename.split('.md')
            const path = `../${jsonDir}/${fileNoExt}.json`

            // Write JSON and create the dir if doesn't exist
            return fs.outputJson(path, { contents })
          })
        })
        .catch(console.error)
    })

    return Promise.all(operations)
  })
  .then(() => {
    Object.entries(index).forEach(([dirname, files]) => {
      // Sort the files by createdAt in desc order
      files.sort((first, second) => {
        return second.createdAt - first.createdAt
      })
      // Write a JSON listing for each child dir
      fs.outputJson(`../${jsonDir}/${dirname}/index.json`, files)
    })
  })
  .catch(console.error)
