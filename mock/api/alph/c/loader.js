const requireFiles = require.context('./', false, /(.*?)\.(js)$/)

const xors=['./index.js','./loader.js']

let files = {}
requireFiles.keys().forEach((fileName) => {
  const file = requireFiles(fileName)
  if (xors.includes(fileName)) return
  const key =fileName?.split('/')?.pop()?.replace(/\.\w+$/, '')
  files[key] = file
})

module.exports = files
