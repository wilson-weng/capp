const getRouteName = () => {
  let pages = getCurrentPages()
  let pageName = pages[pages.length - 1].route || ''

  return pageName.split('/')[1]
}

module.exports = {
  getRouteName
}
