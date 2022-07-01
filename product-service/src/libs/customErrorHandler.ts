import { formatJSONResponse } from '@libs/api-gateway';

const customErrorHandler = () => {
  const customMiddlewareOnError = async (request) => {
    request.response = formatJSONResponse({ info: request.error }, 500);
  }

  return {
    onError: customMiddlewareOnError
  }
}

export default customErrorHandler