import { Controller, Get, Request, Response, Post, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  processRequest(@Request() req, @Response() res): string {
    const originalUrl = req.originalUrl;
    const method = req.method;
    const body = req.body;
    const authorizationHeader = req.headers['authorization'];

    const recipient = originalUrl.split('/')[1];
    const recipientUrl = process.env[recipient];
    console.log(recipientUrl)
    console.log(authorizationHeader)

    if (recipientUrl) {
      const axiosConfig = {
        method: method,
        url: `${recipientUrl}${originalUrl}`,
        headers: {
          ...(authorizationHeader && { Authorization: authorizationHeader })
        },
        ...(Object.keys(req.body || {}).length > 0 && { data: body })
      };

      axios(axiosConfig).then((response) => {
        console.log(response);
        res.json(response.data);
      })
        .catch(error => {
          console.log('Error: ', JSON.stringify(error));

          if (error.response) {
            const { status, data } = error.response;
            res.status(status).json(data);
          }
          else {
            res.status(500).json({ error: error.message });
          }
        })
    }
    else {
      res.status(502).json({ error: 'Cannot process request.' })
    }

    return res.message;
  }

  @Get('/*')
  @Post()
  @Put()
  @Delete()
  allRequests(@Request() req, @Response() res): string {
    return this.processRequest(req,res);
  }
}
