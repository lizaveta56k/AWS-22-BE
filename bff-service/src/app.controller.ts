import {
  Controller,
  Get,
  Request,
  CACHE_MANAGER,
  Response,
  Post,
  Put,
  Delete,
  Inject
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import axios from 'axios';
import { Response as ExpressResponse } from 'express';

@Controller()
export class AppController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  async processRequest(@Request() req): Promise<ResponseProxy> {
    const originalUrl = req.originalUrl;
    const method = req.method;
    const body = req.body;
    const authorizationHeader = req.headers['authorization'];

    const recipient = originalUrl.split('/')[1];
    const recipientUrl = process.env[recipient];
    const reqUrl = originalUrl.split('/').slice(2).join('/');

    console.log(authorizationHeader);
    console.log(reqUrl);

    if (recipientUrl) {
      const axiosConfig = {
        method: method,
        url: `${recipientUrl}/${reqUrl}`,
        headers: {
          ...(authorizationHeader && { Authorization: authorizationHeader })
        },
        ...(Object.keys(req.body || {}).length > 0 && { data: body })
      };

      const result: ResponseProxy = await axios(axiosConfig).then((response) => {
        console.log(response);
        return {
          statusCode: response.status,
          data: response.data,
        }
      })
        .catch(error => {
          console.log('Error: ', JSON.stringify(error));

          if (error.response) {
            const { status, data } = error.response;
            return {
              statusCode: status,
              data: data,
            }
          }
          else {
            return {
              statusCode: error.response.status,
              data: error.response.data,
            }
          }
        });

      return result;
    }
    else {
      return {
        statusCode: 502,
        data: "Cannot process the request",
      }
    }
  }

  @Get('/*')
  async getRequests(@Request() req, @Response() res: ExpressResponse): Promise<void> {
    const originalUrl = req.originalUrl as string;
    const base64Url = Buffer.from(originalUrl).toString('base64');
    const cacheResponseMessage = await this.cacheManager.get(base64Url) as string;

    const cacheableUrls = process.env['cacheable_urls'];
    const cacheableServices = cacheableUrls?.split(';');

    if (cacheResponseMessage) {
      console.log("Return from cache!");
      var cachedResponse = JSON.parse(Buffer.from(cacheResponseMessage, 'base64').toString()) as ResponseProxy;

      res.status(cachedResponse.statusCode).json(cachedResponse.data)
    }
    else {
      console.log("Return from NO cache!");
      const result = await this.processRequest(req);

      if (res.statusCode === 200 && cacheableServices.indexOf(originalUrl) > -1) {
        const base64Message = Buffer.from(JSON.stringify(result)).toString('base64');
        await this.cacheManager.set(base64Url, base64Message, { ttl: 120 });
      }

      res.status(result.statusCode).json(result.data)
    }
  }

  @Post('/*')
  @Put('/*')
  @Delete('/*')
  async allRequests(@Request() req, @Response() res: ExpressResponse): Promise<void> {
    const result = await this.processRequest(req);
    res.status(result.statusCode).json(result.data);
  }
}

interface ResponseProxy {
  statusCode: number;
  data: any;
}