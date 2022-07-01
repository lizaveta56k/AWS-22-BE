import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import customErrorHandler from "./customErrorHandler"

export const middyfy = (handler) => {
  return middy(handler).use(middyJsonBodyParser()).use(customErrorHandler());
}
