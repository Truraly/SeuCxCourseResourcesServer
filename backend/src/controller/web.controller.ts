import {
  ALL,
  App,
  Controller,
  Inject,
  Get,
  Provide,
  Query,
} from '@midwayjs/core';
// import { Context, Application } from '@midwayjs/egg';

import * as path from 'path';
import * as fs from 'fs';
import { BaseController } from './base.controller';

@Controller('/')
export class WebController extends BaseController {
//   @Get('/*')
//   async forwardNonApiRequest() {
//     // 转发到前端
//     return createProxyMiddleware({
//       target: 'http://localhost:8080',
//       changeOrigin: true,
//       pathRewrite: {
//         '^/': '/',
//       },
//     })(this.ctx.req, this.ctx.res, this.ctx.next);
//   }
}
