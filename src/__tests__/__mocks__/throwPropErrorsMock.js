function throwPropErrors() {
  console.error = (message, ...args) => {
    if (/(Invalid prop|Failed prop type)/gi.test(message)) {
      throw new Error(message)
    }
  }
}

export default throwPropErrors
