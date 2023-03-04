const requireComponent = require.context('./', false, /(.*?)\.(vue)$/)

let components={}
requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName)
  const component=componentConfig.default
  const name=component?.name
  if (!name) return
  components[name]=component || componentConfig
})

export default components
