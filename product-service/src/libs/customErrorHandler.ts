const customErrorHandler = () => {
  const customMiddlewareOnError = async (request) => {
    console.log('customMiddlewareOnError')
    console.log(request)
  }

  return {
    onError: customMiddlewareOnError
  }
}

export default customErrorHandler